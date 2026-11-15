const V = 'vista-43452f820ed4', CORE = ['./', './fonts/archivo.woff2', './fonts/martian-mono.woff2', './assets/voyagers3d.js', './assets/body.json', './assets/body.glb'];
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
