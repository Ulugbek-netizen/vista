// Bundles the 3D viewer and the parts of three.js it uses into ../../assets/vista3d.js (one ES module, minified).
// Run: cd tools/3d && npm install && node build.mjs
import { build } from 'esbuild';
await build({
  entryPoints: ['viewer.js'], bundle: true, format: 'esm', minify: true, target: 'es2020',
  outfile: '../../assets/vista3d.js', legalComments: 'eof',
  banner: {js: '/* Vista 3D viewer. three.js (MIT, (c) three.js authors). Anatomy data: BodyParts3D, (c) The Database Center for Life Science, CC BY-SA 2.1 Japan. */'},
});
console.log('built assets/vista3d.js');
