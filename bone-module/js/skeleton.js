/*
 * Anatomical skeleton for the body map (front view, viewBox 0 0 200 450).
 * Grey bones are context only. Coloured, clickable bones are the sites that lose
 * the most density in space: lumbar spine, pelvis, hip, thigh and shin.
 * Left-side parts are drawn once and mirrored around x = 100.
 */
const Skeleton = (() => {
  const both = (s) => `<g>${s}</g><g transform="matrix(-1 0 0 1 200 0)">${s}</g>`;
  const range = (n, f) => Array.from({ length: n }, (_, i) => f(i)).join('');

  // ---------- context bones (not tracked) ----------
  const skull = `
    <path class="bone" d="M100 8 C81 8 75 23 76 37 C77 47 82 53 86 57 L114 57 C118 53 123 47 124 37 C125 23 119 8 100 8 Z"/>
    <circle class="hole" cx="91.5" cy="35" r="5.5"/><circle class="hole" cx="108.5" cy="35" r="5.5"/>
    <path class="hole" d="M100 41 L96.5 48 L103.5 48 Z"/>
    <path class="bone" d="M87 55 Q100 64 113 55 L111 62 Q100 71 89 62 Z"/>`;
  const cervical = range(3, (i) => `<rect class="bone" x="96" y="${62 + i * 6.5}" width="8" height="5" rx="2"/>`);
  const thoracic = range(9, (i) => `<rect class="bone" x="95" y="${83 + i * 7.6}" width="10" height="6" rx="2"/>`);
  const ribs = range(8, (i) => {
    const y = 90 + i * 7.5;
    const w = [19, 25, 29, 31, 32, 31, 28, 24][i];
    return `<path class="rib" d="M96 ${y} C${96 - w * 0.5} ${y - 5} ${100 - w - 6} ${y + 1} ${100 - w} ${y + 12 + i}"/>`;
  });
  const sternum = `<path class="bone" d="M96 84 L104 84 L103 128 L100 133 L97 128 Z"/>`;
  const arm = `
    <path class="line" stroke-width="4" d="M97 80 Q82 75 66 80"/>
    <circle class="bone" cx="64" cy="85" r="6"/>
    <path class="line" stroke-width="7" d="M63 90 L54 150"/>
    <path class="line" stroke-width="3.5" d="M53 154 L43 214"/>
    <path class="line" stroke-width="3.5" d="M57 154 L50 214"/>
    <path class="bone" d="M41 216 L52 216 L54 232 L47 240 L39 232 Z"/>`;
  const knee = `<circle class="bone" cx="77" cy="345" r="4.5"/>`;
  const fibula = `<path class="line" stroke-width="3" d="M66 355 L69 418"/>`;
  const foot = `<path class="bone" d="M70 423 L84 423 L88 436 L66 440 Z"/>`;

  // ---------- tracked bones ----------
  const lumbar = range(5, (i) => `<rect x="91" y="${153 + i * 10.4}" width="18" height="8.6" rx="3"/>`);
  const pelvisSide = `
    <path d="M93 206 C80 197 60 199 56 213 C54 228 65 240 79 246 L91 241 Z"/>
    <path d="M80 248 Q88 255 97 253 L97 259 Q86 262 77 254 Z"/>`;
  const sacrum = `<path d="M92 205 L108 205 L104 238 L100 242 L96 238 Z"/>`;
  const hipSide = `
    <path d="M70 236 L79 243 L71 263 L60 257 Z"/>
    <circle cx="75" cy="238" r="7.5"/>`;
  const thighSide = `
    <path d="M60 259 L71 264 L81 330 L70 333 Z"/>
    <ellipse cx="76" cy="336" rx="10.5" ry="6"/>`;
  const shinSide = `
    <rect x="67" y="347" width="20" height="7" rx="3"/>
    <path d="M71 353 L83 353 L81 420 L74 420 Z"/>`;

  const site = (key, label, inner) =>
    `<g class="site" data-site="${key}" tabindex="0" role="button"><title>${label}</title>${inner}</g>`;

  const markup = `
    <g class="deco" aria-hidden="true">
      ${skull}${cervical}${thoracic}${both(ribs)}${sternum}${both(arm)}${both(knee)}${both(fibula)}${both(foot)}
    </g>
    ${site('spine', 'Lumbar spine', lumbar)}
    ${site('pelvis', 'Pelvis', both(pelvisSide) + sacrum)}
    ${site('thigh', 'Thigh (femur shaft)', both(thighSide))}
    ${site('hip', 'Hip (femoral neck)', both(hipSide))}
    ${site('tibia', 'Shin (tibia)', both(shinSide))}`;

  return { markup };
})();
