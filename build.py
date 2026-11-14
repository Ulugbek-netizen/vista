"""Build the deployable site into dist/ from the single source file vista.html.

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
SRC = ROOT / 'vista.html'
DIST = ROOT / 'dist'
# outside services the page may call, only after the user presses a button (see the privacy policy)
CONNECT = ['https://planetarycomputer.microsoft.com', 'https://api.nasa.gov', 'https://uxzkuncbgsoaqvtpdogy.supabase.co']
IMAGES = ['https://planetarycomputer.microsoft.com']


def build():
    src = SRC.read_text(encoding='utf-8')
    scripts = re.findall(r'<script>(.*?)</script>', src, re.S)
    assert len(scripts) == 1, 'expected exactly one inline script'
    sha = base64.b64encode(hashlib.sha256(scripts[0].encode('utf-8')).digest()).decode()
    csp = '; '.join([
        "default-src 'none'",
        f"script-src 'sha256-{sha}'",
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: " + ' '.join(IMAGES),
        "font-src 'self'",
        "connect-src " + ' '.join(CONNECT),
        "base-uri 'none'",
        "form-action 'none'",
    ])
    head = ('<!doctype html>\n<html lang="en">\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
            f'<meta http-equiv="Content-Security-Policy" content="{csp}">\n'
            '<meta name="referrer" content="no-referrer">\n'
            '<link rel="preload" href="fonts/archivo.woff2" as="font" type="font/woff2" crossorigin>\n')
    if DIST.exists():  # clean rebuild, but keep the Vercel project link (.vercel, git-ignored)
        for x in DIST.iterdir():
            if x.name != '.vercel':
                shutil.rmtree(x) if x.is_dir() else x.unlink()
    (DIST / 'fonts').mkdir(parents=True)
    (DIST / 'index.html').write_text(head + src, encoding='utf-8')
    for f in (ROOT / 'fonts').iterdir():
        shutil.copy2(f, DIST / 'fonts' / f.name)
    headers = {
        'Content-Security-Policy': csp + "; frame-ancestors 'none'",
        'Referrer-Policy': 'no-referrer',
        'X-Content-Type-Options': 'nosniff',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Strict-Transport-Security': 'max-age=63072000; includeSubDomains',
    }
    vercel = {'cleanUrls': True, 'headers': [
        {'source': '/(.*)', 'headers': [{'key': k, 'value': v} for k, v in headers.items()]},
        {'source': '/fonts/(.*)', 'headers': [{'key': 'Cache-Control', 'value': 'public, max-age=31536000, immutable'}]},
    ]}
    (DIST / 'vercel.json').write_text(json.dumps(vercel, indent=2), encoding='utf-8')
    swa = {'globalHeaders': headers, 'mimeTypes': {'.woff2': 'font/woff2'},
           'navigationFallback': {'rewrite': '/index.html'}}
    (DIST / 'staticwebapp.config.json').write_text(json.dumps(swa, indent=2), encoding='utf-8')
    (DIST / '.vercelignore').write_text('staticwebapp.config.json\n', encoding='utf-8')  # Azure-only file stays off Vercel
    print(f'dist/index.html {len(head + src):,} bytes, script sha256-{sha[:12]}...')


if __name__ == '__main__':
    build()
