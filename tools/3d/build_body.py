"""BodyParts3D -> one GLB with a mesh per Void Voyagers layer (simplified, metres, Y up, body facing +Z).
Lungs are modelled: BodyParts3D 4.0 has the bronchial tree but no lung tissue, so each lung is the smoothed
envelope of its bronchial tree. Data: BodyParts3D, (c) The Database Center for Life Science, CC BY-SA 2.1 Japan."""
import glob, json, os, re, sys
import numpy as np, trimesh, fast_simplification

B = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[1] if len(sys.argv) > 1 else f'{B}/out'
os.makedirs(OUT, exist_ok=True)
idx = {}
for d in ('raw/isa/isa_BP3D_4.0_obj_99', 'raw/obj/partof_BP3D_4.0_obj_99'):
    for p in glob.glob(f'{B}/{d}/*.obj'):
        f = os.path.basename(p)[:-4]
        if f not in idx:
            with open(p, encoding='utf-8', errors='ignore') as h:
                name = next((l.split(':', 1)[1].strip() for l in h if l.startswith('# English name')), '')
            idx[f] = (name, p)
isa = json.load(open(f'{B}/layers.json'))
NO = r'artery|vein|nerve|ganglion|tributary|branch|plexus|retinaculum|ligament|duct|cavity|aqueduct|ventricle of brain|fourth ventricle|lateral ventricle|third ventricle|canal'
SEL = {  # layer: (regex or IS-A list, target triangles)
    'skin': (r'^Skin$', 26000),
    'bones': ('isa:bones', 95000),
    'muscles': ('isa:muscles', 110000),
    'airway': (r'^Trachea$|main bronchus', 2500),
    'bronchi': (r'segmental bronchial tree|lingular bronchial tree', None),  # only to model the lungs
    'heart': (r'^Wall of (left|right) (atrium|ventricle)|^Wall of ventricle|^Wall of heart', 14000),
    'brain': (r'gyrus|occipital lobe|^Cerebellum$|^Pons|Medulla oblongata|Midbrain|thalamus$|Corpus callosum|insula|lobule|cuneus|White matter of|pole$', 16000),
    'eyes': (r'cornea|\blens$|sclera|\biris$', 2500),
    'liver': (r'Hepatovenous segment|Caudate lobe of liver', 8000),
    'gut': (r'^Stomach$|colon$|jejunum|ileum|^Duodenum$|^Rectum$|^Esophagus$|^Appendix$|cecum|caecum|Sigmoid', 22000),
    'gland': (r'^Pancreas$|^Gallbladder$|adrenal gland', 4000),
    'urinary': (r'(Left|Right) kidney$|(Left|Right) ureter$|^Urinary bladder$', 4500),
    'immune': (r'^Spleen$|lobe of thymus', 2000),
    'arteries': (r'\baorta\b|common carotid artery|subclavian artery|axillary artery|brachial artery|radial artery|ulnar artery|common iliac artery|external iliac artery|femoral artery|popliteal artery|anterior tibial artery|posterior tibial artery|pulmonary trunk|^(Left|Right) pulmonary artery$|renal artery$|brachiocephalic artery', 16000),
    'veins': (r'vena cava|internal jugular vein|subclavian vein|axillary vein|common iliac vein|external iliac vein|femoral vein|popliteal vein|great saphenous vein|cephalic vein|basilic vein|renal vein$|brachiocephalic vein', 14000),
    'genitals': (r'penis|testis|scrot|^Prostate$', 3000),
}
files, seen = {}, set()
for L, (rx, _) in SEL.items():
    if rx.startswith('isa:'):
        fs = [f for f in isa[rx[4:]] if f in idx]
    else:
        fs = [f for f, (n, _) in idx.items() if re.search(rx, n, re.I) and (L in ('skin', 'arteries', 'veins', 'airway', 'bronchi') or not re.search(NO, n, re.I))]
    if L == 'muscles':
        fs = [f for f in fs if not re.search(r'Diaphragm', idx[f][0])] + [f for f in fs if re.search(r'Diaphragm', idx[f][0])]
    files[L] = [f for f in fs if f not in seen]
    seen.update(files[L])


def load(f):
    m = trimesh.load(idx[f][1], process=False, force='mesh')
    return np.asarray(m.vertices, dtype=np.float64), np.asarray(m.faces, dtype=np.int64)


def simplify(v, f, ratio, minf=40):
    if len(f) <= minf or ratio >= 0.999:
        return v, f
    red = min(0.98, max(0.0, 1 - max(ratio, minf / len(f))))
    v2, f2 = fast_simplification.simplify(v.astype(np.float32), f.astype(np.int32), target_reduction=red)
    return v2.astype(np.float64), f2.astype(np.int64)


def build(L, target):
    total = 0
    parts = [load(f) for f in files[L]]
    total = sum(len(f) for _, f in parts) or 1
    ratio = target / total
    vs, fs, off = [], [], 0
    for v, f in parts:
        v, f = simplify(v, f, ratio)
        vs.append(v); fs.append(f + off); off += len(v)
    return np.vstack(vs), np.vstack(fs)


def lung(side):
    pts = [load(f)[0] for f in files['bronchi'] if idx[f][0].startswith(side) or (side == 'Left' and 'lingular' in idx[f][0])]
    P = np.vstack(pts)
    pitch = 4.0
    lo = P.min(0) - 40
    shape = np.ceil((P.max(0) + 40 - lo) / pitch).astype(int)
    g = np.zeros(shape, bool)
    ij = ((P - lo) / pitch).astype(int)
    g[ij[:, 0], ij[:, 1], ij[:, 2]] = True
    from scipy import ndimage
    g = ndimage.binary_dilation(g, iterations=5)
    g = ndimage.binary_closing(g, iterations=6)
    g = ndimage.binary_fill_holes(g)
    g = ndimage.binary_erosion(g, iterations=1)
    from skimage import measure
    vv, ff, _, _ = measure.marching_cubes(ndimage.gaussian_filter(g.astype(np.float32), 2.2), .5)
    m = trimesh.Trimesh(vv * pitch + lo, ff, process=True)
    trimesh.smoothing.filter_taubin(m, iterations=40)
    v, f = simplify(np.asarray(m.vertices), np.asarray(m.faces), 8000 / max(len(m.faces), 1))
    return v, f


meshes = {}
for L, (rx, target) in SEL.items():
    if L == 'bronchi' or not files[L]:
        continue
    meshes[L] = build(L, target)
    print(f'{L:8s} {len(files[L]):4d} files -> {len(meshes[L][1]):7d} tris')
lv, lf = lung('Left'); rv, rf = lung('Right')
meshes['lungs'] = (np.vstack([lv, rv]), np.vstack([lf, rf + len(lv)]))
print('lungs (modelled)', len(meshes['lungs'][1]), 'tris')

# placement: BodyParts3D is in mm, Z up, -Y anterior. Glb: metres, Y up, +Z anterior, feet at y=0, centred on x.
sk = meshes['skin'][0]
cx, z0 = (sk[:, 0].min() + sk[:, 0].max()) / 2, sk[:, 2].min()
cy = (sk[:, 1].min() + sk[:, 1].max()) / 2
scene = trimesh.Scene()
meta = {}
for L, (v, f) in meshes.items():
    w = np.column_stack([(v[:, 0] - cx), (v[:, 2] - z0), -(v[:, 1] - cy)]) / 1000.0
    m = trimesh.Trimesh(w, f, process=True)
    m.fix_normals()
    scene.add_geometry(m, node_name=L, geom_name=L)
    meta[L] = {'tris': int(len(m.faces)), 'files': len(files.get(L, [])) if L != 'lungs' else 'modelled'}
scene.export(f'{OUT}/body.glb')
bl = [f for f in files['urinary'] if 'bladder' in idx[f][0].lower()]
bc = load(bl[0])[0].mean(0)
land = {'bladder': [float((bc[0] - cx) / 1000), float((bc[2] - z0) / 1000), float(-(bc[1] - cy) / 1000)]}
json.dump({'landmarks': land, 'height_m': float((sk[:, 2].max() - z0) / 1000), 'layers': meta}, open(f'{OUT}/body.json', 'w'), indent=1)
print('wrote', f'{OUT}/body.glb', os.path.getsize(f'{OUT}/body.glb') // 1024, 'KB; height', round((sk[:, 2].max() - z0) / 1000, 3), 'm')
