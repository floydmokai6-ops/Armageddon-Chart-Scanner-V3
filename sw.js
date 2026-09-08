const CACHE = 'armageddon-scanner-v1';
const SHELL = ['./index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

// App shell: cache-first. Everything else (market data / AI calls): network-only,
// since candles and analysis must always be live, never served stale from cache.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  const isShellFile = SHELL.some((f) => url.pathname.endsWith(f.replace('./', '')));
  if (e.request.method !== 'GET' || !isShellFile) return; // let network requests pass through untouched
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
