/* ShotDeck Service Worker
   - Pre-caches the app shell so the site installs + opens offline (PWA requirement)
   - Runtime-caches static assets (JS/CSS/icons/fonts)
   - Lets YouTube traffic pass straight to the network (streams can't/shouldn't be cached;
     playback keeps working while online — this never blocks video)
   - Navigation requests always try the network first, so the page is never stuck blank
*/
const VERSION = 'v2';
const SHELL_CACHE = `shotdeck-shell-${VERSION}`;
const RUNTIME_CACHE = `shotdeck-runtime-${VERSION}`;

const SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/icon-maskable-512.png',
  '/apple-touch-icon.png',
  '/favicon.svg',
  '/favicon-32.png'
];

self.addEventListener('install', (e) => {
  // Cache each asset independently so one 404 can't reject the whole install.
  e.waitUntil(
    caches.open(SHELL_CACHE)
      .then((c) => Promise.allSettled(SHELL_ASSETS.map((url) => c.add(url))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => ![SHELL_CACHE, RUNTIME_CACHE].includes(k))
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Cross-origin YouTube / Google video traffic → always hit the network.
  // Do NOT attempt to cache; this is what keeps playback working.
  const isYouTube = /youtube\.com|youtube-nocookie\.com|ytimg\.com|googlevideo\.com/.test(url.host);
  if (isYouTube) {
    e.respondWith(fetch(req).catch(() => Response.error()));
    return;
  }

  // Same-origin navigations: network-first, fall back to cached shell (offline support).
  // This guarantees the user always gets the latest HTML when online and never a blank page.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match('/index.html').then((h) => h || caches.match('/'))))
    );
    return;
  }

  // Everything else (JS/CSS/icons/fonts, same-origin): stale-while-revalidate
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req)
        .then((res) => {
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || net;
    })
  );
});
