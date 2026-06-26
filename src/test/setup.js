// Adds custom jest-dom matchers (toBeInTheDocument, toHaveClass, …) to Vitest's expect.
import '@testing-library/jest-dom';

/**
 * Node 25 ships an experimental global `localStorage` that can shadow jsdom's implementation and
 * lacks a working clear(). Install a deterministic in-memory Storage mock so storage-backed code
 * (useFavorites, the contact form) behaves consistently in tests regardless of the runtime.
 */
class MemoryStorage {
  #store = new Map();
  get length() { return this.#store.size; }
  getItem(key) { return this.#store.has(key) ? this.#store.get(key) : null; }
  setItem(key, value) { this.#store.set(String(key), String(value)); }
  removeItem(key) { this.#store.delete(key); }
  clear() { this.#store.clear(); }
  key(i) { return Array.from(this.#store.keys())[i] ?? null; }
}

const storage = new MemoryStorage();
const install = (target) => {
  try {
    Object.defineProperty(target, 'localStorage', { value: storage, writable: true, configurable: true });
  } catch {
    target.localStorage = storage;
  }
};

install(globalThis);
if (typeof window !== 'undefined') install(window);
