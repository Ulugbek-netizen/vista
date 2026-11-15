"""Build the deployable site into dist/ from the single source file void-voyagers.html.

python build.py   ->  dist/index.html, dist/fonts/*, dist/vercel.json, dist/staticwebapp.config.json

The page has one inline <script>; its SHA-256 goes into the Content-Security-Policy so
no other script can run. No cookies, no third-party scripts, fonts are self-hosted.
"""
import base64
import hashlib
import json
import pathlib
import re
import shutil

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'void-voyagers.html'
DIST = ROOT / 'dist'
# outside services the page may call, only after the user presses a button (see the privacy policy)
CONNECT = ['https://planetarycomputer.microsoft.com', 'https://api.nasa.gov', 'https://uxzkuncbgsoaqvtpdogy.supabase.co']
IMAGES = ['https://planetarycomputer.microsoft.com']
# Offline support: the page itself is network-first (so a new deploy shows up at once) with the cached copy as fallback;
# fonts are cache-first. Requests to other sites (NASA, Planetary Computer, the report inbox) are never cached.
SW = r"""const V = 'vista-VERSION', CORE = ['./', './fonts/archivo.woff2', './fonts/martian-mono.woff2', './assets/voyagers3d.js', './assets/body.json', './assets/body.glb'];
self.addEventListener('install', e => e.waitUntil(caches.open(V).then(c => c.addAll(CORE)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  if (r.mode === 'navigate') {
    const shell = /\/(index\.html)?$/.test(new URL(r.url).pathname); // only the app page itself becomes the offline copy
    e.respondWith(fetch(r).then(res => { if (shell && res.ok && !res.redirected) { const copy = res.clone(); caches.open(V).then(c => c.put('./', copy)); } return res; })
      .catch(() => caches.match('./')));
    return;
  }
  e.respondWith(caches.match(r, {ignoreSearch: true}).then(hit => hit || fetch(r)));
});
"""



def sw_version(page):
    # every cached file counts, so a deploy that only changes the 3D body or a font still updates offline copies
    h = hashlib.sha256(page.encode('utf-8'))
    here = pathlib.Path(__file__).resolve().parent
    for f in sorted(list((here / 'assets').glob('*')) + list((here / 'fonts').glob('*.woff2'))):
        if f.is_file():
            h.update(f.name.encode()); h.update(f.read_bytes())
    return h.hexdigest()[:12]


SITE = 'https://void-voyagers.vercel.app'
ICON = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#05070B"/>'
        '<circle cx="256" cy="256" r="150" fill="none" stroke="#4C8DFF" stroke-width="18" opacity=".7"/>'
        '<ellipse cx="256" cy="256" rx="230" ry="86" fill="none" stroke="#FFA23A" stroke-width="22" transform="rotate(-24 256 256)"/>'
        '<path d="M170 180l86 160 86-160" fill="none" stroke="#E8EDF4" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/></svg>')


def seo_files():
    # search engines and installing as an app: robots.txt, sitemap.xml, a web manifest and its icon
    (DIST / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n', encoding='utf-8')
    (DIST / 'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
                                      f'  <url><loc>{SITE}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>\n</urlset>\n', encoding='utf-8')
    (DIST / 'icon.svg').write_text(ICON, encoding='utf-8')
    (DIST / 'manifest.webmanifest').write_text(json.dumps({
        'name': 'Void Voyagers: crew health beyond Earth', 'short_name': 'Void Voyagers', 'start_url': './#home', 'scope': './',
        'display': 'standalone', 'background_color': '#05070B', 'theme_color': '#05070B',
        'description': 'A one-minute health check for astronauts. Works offline.',
        'icons': [{'src': 'icon.svg', 'sizes': 'any', 'type': 'image/svg+xml', 'purpose': 'any'}]}, indent=2), encoding='utf-8')


def build():
    src = SRC.read_text(encoding='utf-8')
    scripts = re.findall(r'<script>(.*?)</script>', src, re.S)
    assert len(scripts) == 1, 'expected exactly one inline script'
    sha = base64.b64encode(hashlib.sha256(scripts[0].encode('utf-8')).digest()).decode()
    csp = '; '.join([
        "default-src 'none'",
        f"script-src 'self' 'sha256-{sha}'",  # 'self': the 3D viewer module in assets/
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: " + ' '.join(IMAGES),  # blob: photos from home, decrypted on the device
        "media-src blob:",  # voice notes from home
        "font-src 'self'",
        "connect-src 'self' " + ' '.join(CONNECT),  # 'self': the offline service worker caches the app's own files
        "worker-src 'self'",
        "manifest-src 'self'",  # install as an app (offline)
        "base-uri 'none'",
        "form-action 'none'",
    ])
    head = ('<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            f'<meta http-equiv="Content-Security-Policy" content="{csp}">\n'
            '<meta name="referrer" content="no-referrer">\n'
            '<link rel="preload" href="fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>\n'
            f'<link rel="canonical" href="{SITE}/">\n<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon.svg">\n'
            '<meta name="robots" content="index,follow">\n'
            '<meta name="keywords" content="astronaut health, space medicine, NASA Space Apps 2026, crew health, offline health check, Mars mission, flight surgeon">\n'
            '<meta property="og:type" content="website">\n<meta property="og:site_name" content="Void Voyagers">\n'
            '<meta property="og:title" content="Void Voyagers: stay well beyond Earth">\n'
            '<meta property="og:description" content="A one-minute health check for astronauts: one reading, one verdict, one next step. Works offline. NASA Space Apps 2026.">\n'
            f'<meta property="og:url" content="{SITE}/">\n<meta name="twitter:card" content="summary">\n')
    if DIST.exists():  # clean rebuild, but keep the Vercel project link (.vercel, git-ignored)
        for x in DIST.iterdir():
            if x.name != '.vercel':
                shutil.rmtree(x) if x.is_dir() else x.unlink()
    (DIST / 'fonts').mkdir(parents=True)
    (DIST / 'index.html').write_text(head + src, encoding='utf-8')
    seo_files()
    for f in (ROOT / 'fonts').iterdir():
        shutil.copy2(f, DIST / 'fonts' / f.name)
    shutil.copytree(ROOT / 'assets', DIST / 'assets')  # 3D viewer (three.js bundle) and BodyParts3D model
    headers = {
        'Content-Security-Policy': csp + "; frame-ancestors 'none'",
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
        'X-Frame-Options': 'DENY',
    }
    vercel = {'cleanUrls': True, 'headers': [
        {'source': '/(.*)', 'headers': [{'key': k, 'value': v} for k, v in headers.items()]},
        {'source': '/fonts/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
        {'source': '/sw.js', 'headers': [{'key': 'Cache-Control', 'value': 'no-cache'}]},
    ]}
    # offline: a service worker keeps the page and fonts; the version changes with every build so updates replace the cache
    (DIST / 'sw.js').write_text(SW.replace('VERSION', sw_version(head + src)), encoding='utf-8')
    (DIST / 'vercel.json').write_text(json.dumps(vercel, indent=2), encoding='utf-8')
    swa = {'globalHeaders': headers, 'mimeTypes': {'.woff2': 'font/woff2', '.glb': 'model/gltf-binary'}}  # no catch-all rewrite: unknown paths get a real 404
    (DIST / 'staticwebapp.config.json').write_text(json.dumps(swa, indent=2), encoding='utf-8')
    (DIST / '.vercelignore').write_text('staticwebapp.config.json\n', encoding='utf-8')  # Azure-only file stays off Vercel
    print(f'dist/index.html {len(head + src):,} bytes, script sha256-{sha[:12]}...')


if __name__ == '__main__':
    build()
