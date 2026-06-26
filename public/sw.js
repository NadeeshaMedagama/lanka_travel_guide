/**
 * Service Worker — Lanka Travel Guide PWA
 *
 * WHAT A SERVICE WORKER IS: a script the browser runs in the background, separate from the page,
 * acting as a programmable network proxy. It can intercept every fetch the app makes and decide
 * whether to answer from the cache or the network — this is what enables OFFLINE support.
 *
 * LIFECYCLE: install -> activate -> fetch (intercepts requests). On install we pre-cache the
 * "app shell" (the minimum needed to boot the UI). On activate we delete stale caches. The fetch
 * handler then applies a per-request-type caching strategy.
 *
 * NOTE: registered in production builds only (see src/registerSW.js) so it never interferes with
 * Vite's hot-module-reload during `npm run dev`.
 */
const CACHE_VERSION = 'lkg-cache-v1';
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon.svg',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Pre-cache the app shell as soon as the worker installs.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  // Activate this worker immediately instead of waiting for old tabs to close.
  self.skipWaiting();
});

// Remove caches from previous versions, then take control of open pages.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first: serve from cache, fall back to network and store the result.
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) {
    const cache = await caches.open(CACHE_VERSION);
    cache.put(request, response.clone());
  }
  return response;
}

// Network-first: try the network (fresh data), fall back to cache when offline.
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.ok) {
      const cache = await caches.open(CACHE_VERSION);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw new Error('Network failed and no cached response available.');
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Only GET requests are cacheable; let everything else hit the network untouched.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1) SPA navigations -> network-first, falling back to the cached app shell when offline.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request).catch(() => caches.match('/index.html')));
    return;
  }

  // 2) Attraction data from the REST API -> network-first so it stays fresh, cache as offline backup.
  if (url.pathname.startsWith('/attractions')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // 3) Built assets, icons and remote images -> cache-first for instant repeat loads.
  event.respondWith(cacheFirst(request));
});
