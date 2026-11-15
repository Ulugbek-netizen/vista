// Void Voyagers 3D body viewer. Bundled by tools/3d/build.mjs into assets/voyagers3d.js (self-hosted, no CDN).
// Anatomy: BodyParts3D, (c) The Database Center for Life Science, CC BY-SA 2.1 Japan (assets/body.glb, tools/3d/build_body.py).
import {
  WebGLRenderer, Scene, PerspectiveCamera, HemisphereLight, DirectionalLight, MeshPhysicalMaterial, Color, Raycaster, Vector2,
  PMREMGenerator, SphereGeometry, Mesh, SRGBColorSpace, ACESFilmicToneMapping, FrontSide, DoubleSide, BackSide, Group, Vector3, BufferGeometry, BufferAttribute,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const SYS = {muscles: 'msk', bones: 'msk', airway: 'resp', lungs: 'resp', heart: 'cardio', arteries: 'cardio', veins: 'cardio', brain: 'mind',
  eyes: 'eyes', liver: 'metab', gut: 'metab', gland: 'metab', urinary: 'metab', immune: 'immune', uterus: 'metab', ovaries: 'metab'};
const LOOK = { // natural tissue colours, roughness, clearcoat (wet tissue sheen)
  skin: ['#d9a08a', .55, .2], muscles: ['#8e2b24', .5, .5], bones: ['#e6d8bd', .62, .1], airway: ['#d8c9b8', .5, .3], lungs: ['#e0898f', .7, .25],
  heart: ['#9c2a32', .42, .6], arteries: ['#c8202b', .38, .55], veins: ['#2a6fd1', .38, .55], brain: ['#e3b2ae', .58, .35], eyes: ['#f3efe8', .2, .9],
  liver: ['#7a2a22', .45, .55], gut: ['#d79a76', .5, .5], gland: ['#d8b064', .5, .4], urinary: ['#9a3a33', .45, .5], immune: ['#6b2a52', .45, .5],
  genitals: ['#c98476', .5, .3], uterus: ['#cf7f86', .5, .5], ovaries: ['#e2b39c', .5, .5],
};
const ORGANS = ['airway', 'lungs', 'heart', 'brain', 'eyes', 'liver', 'gut', 'gland', 'urinary', 'immune', 'genitals', 'uterus', 'ovaries'];
const VIEWS = { // layer -> opacity (0 hidden)
  muscles: {skin: .13, muscles: 1, bones: 1, eyes: 1, genitals: 1},
  organs: {skin: .16, muscles: .1, arteries: 1, veins: 1, ...Object.fromEntries(ORGANS.map(k => [k, 1]))},
  bones: {skin: .12, bones: 1},
  status: {skin: .08, bones: 1, ...Object.fromEntries(ORGANS.map(k => [k, 1]))},
};
// Average female proportions as a smooth horizontal scale by height (same model as the 2D map in tools/anatomy.py)
const KNOTS = [[0, 1], [60, 1], [80, .92], [120, .92], [165, .93], [186, 1], [205, 1.06], [232, 1.06], [272, 1.03], [330, 1], [470, 1]].map(([y, s]) => [(443 - y) / 439, s]).reverse();
function sOf(f) {
  for (let i = 1; i < KNOTS.length; i++) {
    const [f0, s0] = KNOTS[i - 1], [f1, s1] = KNOTS[i];
    if (f <= f1) { let t = (f - f0) / (f1 - f0); t = t * t * (3 - 2 * t); return s0 + (s1 - s0) * t; }
  }
  return 1;
}

export async function mount(el, {glb, meta, onPick, reduced}) {
  const H = meta.height_m;
  const renderer = new WebGLRenderer({antialias: true, alpha: true, powerPreference: 'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  el.appendChild(renderer.domElement);
  const scene = new Scene();
  scene.environment = new PMREMGenerator(renderer).fromScene(new RoomEnvironment(), .04).texture;
  scene.add(new HemisphereLight('#dfefff', '#2a1a14', .55));
  const key = new DirectionalLight('#fff4e8', 1.6); key.position.set(1.2, 2.6, 2.2); scene.add(key);
  const rim = new DirectionalLight('#7fe3ff', 1.1); rim.position.set(-2, 1.6, -2.4); scene.add(rim);
  const camera = new PerspectiveCamera(28, 1, .05, 30);
  camera.position.set(0, H * .55, 4.2);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, H * .53, 0);
  Object.assign(controls, {enablePan: false, enableDamping: true, dampingFactor: .08, minDistance: 1.1, maxDistance: 5.5,
    minPolarAngle: Math.PI * .3, maxPolarAngle: Math.PI * .7, autoRotate: !reduced, autoRotateSpeed: 1.4});
  controls.addEventListener('start', () => { controls.autoRotate = false; });
  setTimeout(() => { controls.autoRotate = false; }, 9000); /* a short turn to show it is 3D, then it stays still while you read */

  const gltf = await new GLTFLoader().loadAsync(glb);
  const layers = {}, base = {}, found = [];
  gltf.scene.updateMatrixWorld(true);
  gltf.scene.traverse(o => { if (o.isMesh) found.push(o); });
  const root = new Group();
  for (const o of found) {
    const name = LOOK[o.parent?.name] ? o.parent.name : o.name;
    // positions are quantized (gltfpack): bake the node transform into plain float positions so the female warp works in metres
    const src = o.geometry.attributes.position, v = new Vector3(), pos = new Float32Array(src.count * 3);
    for (let i = 0; i < src.count; i++) { v.fromBufferAttribute(src, i).applyMatrix4(o.matrixWorld); pos.set([v.x, v.y, v.z], i * 3); }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(pos, 3));
    const idx = Uint32Array.from(o.geometry.index.array);
    if (name === 'skin') { // make the skin face outwards (signed volume > 0) so FrontSide/BackSide mean outside/inside
      let vol = 0;
      for (let i = 0; i < idx.length; i += 3) {
        const a = idx[i] * 3, b = idx[i + 1] * 3, c = idx[i + 2] * 3;
        vol += pos[a] * (pos[b + 1] * pos[c + 2] - pos[b + 2] * pos[c + 1]) - pos[a + 1] * (pos[b] * pos[c + 2] - pos[b + 2] * pos[c]) + pos[a + 2] * (pos[b] * pos[c + 1] - pos[b + 1] * pos[c]);
      }
      if (vol < 0) for (let i = 0; i < idx.length; i += 3) { const t = idx[i + 1]; idx[i + 1] = idx[i + 2]; idx[i + 2] = t; }
    }
    g.setIndex(new BufferAttribute(idx, 1));
    g.computeVertexNormals();
    const [c, r, cc] = LOOK[name] || ['#cccccc', .5, 0];
    const m = new Mesh(g, new MeshPhysicalMaterial({color: c, roughness: r, clearcoat: cc, clearcoatRoughness: .4, side: name === 'skin' ? FrontSide : DoubleSide}));
    m.userData.layer = name;
    m.renderOrder = name === 'skin' ? 2 : name === 'muscles' ? 1 : 0;
    root.add(m);
    layers[name] = m;
    base[name] = pos.slice();
  }
  scene.add(root);
  gltf.scene = root;
  // female pelvic organs (simplified shapes placed from the bladder landmark; BodyParts3D is a male data set)
  const [bx, by, bz] = meta.landmarks.bladder;
  const add = (name, g, x, y, z) => { const m = new Mesh(g, new MeshPhysicalMaterial({color: LOOK[name][0], roughness: .5, clearcoat: .5})); m.position.set(x, y, z); m.userData.layer = name; gltf.scene.add(m); return m; };
  const ut = add('uterus', new SphereGeometry(1, 32, 24), bx, by + .055, bz - .025); ut.scale.set(.026, .036, .02);
  const ov = add('ovaries', new SphereGeometry(1, 20, 14), 0, 0, 0); ov.visible = false;
  const ovL = add('ovaries', new SphereGeometry(1, 20, 14), bx + .055, by + .065, bz - .03), ovR = add('ovaries', new SphereGeometry(1, 20, 14), bx - .055, by + .065, bz - .03);
  [ovL, ovR].forEach(o => o.scale.set(.016, .011, .01));
  layers.uterus = ut; layers.ovaries = ovL; layers.ovaries2 = ovR; ov.removeFromParent();

  let sex = 'm', view = 'muscles', status = {}, sel = null;
  const meshes = () => Object.values(layers);
  function setSex(s) {
    sex = s;
    for (const [name, o] of Object.entries(layers)) {
      if (!base[name]) continue;
      const p = o.geometry.attributes.position.array, b = base[name];
      for (let i = 0; i < p.length; i += 3) {
        const y = b[i + 1], f = y / H;
        let x = b[i], z = b[i + 2];
        if (s === 'f') {
          x *= sOf(f);
          if (name === 'skin') {
            for (const cx of [.095, -.095]) { // breasts
              const dx = b[i] - cx, dy = y - H * .715, w = Math.exp(-(dx * dx + dy * dy * 1.3) / (2 * .052 * .052));
              if (z > .02) { z += .042 * w; }
            }
            if (Math.abs(b[i]) < .07 && y > .7 && y < .9 && z > .03) { // reshape the male external genital region into a smooth mons
              z = .03 + (z - .03) * .12;
              if (y < .82) p[i + 1] = .82 - (.82 - y) * .15;
            } else if (s === 'f') p[i + 1] = y;
          }
        }
        p[i] = x; p[i + 2] = z;
        if (s !== 'f') p[i + 1] = y;
      }
      o.geometry.attributes.position.needsUpdate = true;
      o.geometry.computeVertexNormals();
      o.geometry.computeBoundingSphere();
    }
    apply();
  }
  function apply() {
    const V = VIEWS[view];
    for (const o of meshes()) {
      const name = o.userData.layer;
      let a = V[name] || 0;
      if (name === 'genitals' && sex === 'f') a = 0;
      if ((name === 'uterus' || name === 'ovaries') && sex === 'm') a = 0;
      o.visible = a > 0;
      const m = o.material, k = SYS[name], lv = status[k];
      const inner = false;
      if (m.side !== (inner ? BackSide : FrontSide) && name === 'skin') { m.side = inner ? BackSide : FrontSide; m.needsUpdate = true; }
      m.transparent = a < 1; m.opacity = a; m.depthWrite = a >= 1;
      const natural = new Color((LOOK[name] || ['#ccc'])[0]);
      if (inner) { m.color.set('#4a120e'); m.emissive.set('#000'); continue; }
      m.color.copy(view === 'status' && k ? natural.lerp(new Color(lv == null ? '#6e8278' : ['#35c987', '#f2b938', '#ff8a4a', '#ff5b66'][lv]), .78) : natural);
      const on = k && k === sel && a >= 1;
      m.emissive.set(on ? '#3df5a0' : '#000000'); m.emissiveIntensity = on ? .28 : 0;
    }
  }
  const ray = new Raycaster(), ptr = new Vector2();
  let down = null;
  renderer.domElement.addEventListener('pointerdown', e => { down = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('pointerup', e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const hit = ray.intersectObjects(meshes().filter(o => o.visible && o.material.opacity >= 1), false)[0];
    const k = hit && SYS[hit.object.userData.layer];
    if (k) onPick(k);
  });
  const resize = () => { const w = el.clientWidth, h = el.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  new ResizeObserver(resize).observe(el); resize();
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(el);
  renderer.setAnimationLoop(() => { if (!visible || document.hidden) return; controls.update(); renderer.render(scene, camera); });
  setSex('m');
  return {
    setView(v) { view = v; apply(); },
    setSex(s) { if (s !== sex) setSex(s); },
    setStatus(st, selected) { status = st; sel = selected; apply(); },
    turn(a) { const d = Math.hypot(camera.position.x - controls.target.x, camera.position.z - controls.target.z); camera.position.x = Math.sin(a) * d; camera.position.z = Math.cos(a) * d; },
    spin(on) { controls.autoRotate = on && !reduced; },
  };
}
