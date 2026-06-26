/**
 * API Service Layer
 *
 * WHY ONE FILE: Separation of Concerns — if the data source changes, only this file changes.
 * Components never know WHERE the data comes from.
 *
 * DUAL DATA SOURCE (this is the key to working both locally and when deployed):
 *  1. REST mode — when VITE_API_URL is set (local dev via a `.env` pointing at http://localhost:3001),
 *     the app talks to the json-server mock REST API: real HTTP resources with server-side filtering
 *     (?category=) and per-id endpoints (/attractions/:id).
 *  2. STATIC mode — when VITE_API_URL is NOT set (production build / Vercel), there is no backend, so
 *     the app fetches a static JSON snapshot (public/attractions.json) shipped inside the build and
 *     does filtering / look-ups on the client.
 *  Both paths use the asynchronous Fetch API, so the async architecture is identical either way.
 *
 * WHY THIS MATTERS: json-server is a localhost-only dev tool. A deployed site has no json-server, and
 * an HTTPS page cannot fetch http://localhost — so a hardcoded localhost URL fails in production.
 */

// In DEVELOPMENT, talk to the json-server mock REST API when one is configured (VITE_API_URL, e.g.
// http://localhost:3001 from a local .env). In PRODUCTION there is no backend, so always use the
// bundled static snapshot. Gating on import.meta.env.DEV means Vite dead-code-eliminates the env
// read for production builds — so a localhost URL can never be compiled into the deployed bundle.
const API_URL = import.meta.env.DEV ? import.meta.env.VITE_API_URL : undefined;
const STATIC_URL = `${import.meta.env.BASE_URL}attractions.json`;   // same-origin snapshot (default '/attractions.json')

async function fetchJson(url, errorMessage) {
  const response = await fetch(url);
  // fetch() does NOT throw on HTTP errors (404, 500) — only on network failure. response.ok covers 200–299.
  if (!response.ok) throw new Error(`${errorMessage} (HTTP ${response.status})`);
  return response.json();
}

// Cache the static snapshot promise so repeated navigations don't refetch the same file.
let staticCache;
async function getStaticAttractions() {
  try {
    if (!staticCache) staticCache = fetchJson(STATIC_URL, 'Could not load attraction data');
    return await staticCache;
  } catch (err) {
    staticCache = undefined; // clear on failure so a later retry can succeed
    throw err;
  }
}

export async function fetchAllAttractions() {
  if (API_URL) return fetchJson(`${API_URL}/attractions`, 'Failed to load attractions');
  return getStaticAttractions();
}

export async function fetchByCategory(category) {
  if (API_URL) {
    const url = category === 'All'
      ? `${API_URL}/attractions`
      // encodeURIComponent prevents URL issues if a category contains spaces or special characters
      : `${API_URL}/attractions?category=${encodeURIComponent(category)}`;
    return fetchJson(url, `Failed to filter by ${category}`);
  }
  // STATIC mode: filter the in-memory snapshot on the client
  const all = await getStaticAttractions();
  return category === 'All' ? all : all.filter((a) => a.category === category);
}

export async function fetchAttractionById(id) {
  if (API_URL) return fetchJson(`${API_URL}/attractions/${id}`, `Attraction ${id} not found`);
  // STATIC mode: look the item up on the client (URL param is a string, db ids are numbers)
  const all = await getStaticAttractions();
  const found = all.find((a) => String(a.id) === String(id));
  if (!found) throw new Error(`Attraction ${id} not found`);
  return found;
}
