/**
 * Registers the service worker that powers the PWA / offline support.
 *
 * WHY PRODUCTION-ONLY (import.meta.env.PROD): a service worker aggressively caches assets, which
 * conflicts with Vite's hot-module-reload during development. Registering only in production builds
 * keeps `npm run dev` fast and predictable, while `npm run build && npm run preview` gives a true
 * installable, offline-capable PWA for the demo.
 *
 * WHY 'load' EVENT: defer registration until the page has finished loading so the worker never
 * competes with the initial render for bandwidth.
 */
export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  if (!import.meta.env.PROD) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.info('[PWA] Service worker registered:', reg.scope))
      .catch((err) => console.warn('[PWA] Service worker registration failed:', err));
  });
}
