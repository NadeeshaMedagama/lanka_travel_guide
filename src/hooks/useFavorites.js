import { useState, useEffect } from 'react';

// versioned key — if data schema changes in future, increment to v2 to avoid parsing old data
const STORAGE_KEY = 'lkg_favorites_v1';

/**
 * Custom hook to manage favorite attractions.
 * 
 * WHY A CUSTOM HOOK: Acts as a single source of truth instead of component-level state. Both Home, Favorites, and Detail pages need access to this shared logic.
 * WHY LOCALSTORAGE: localStorage persists after browser close; sessionStorage is cleared when the tab closes. We want user favorites to be permanent.
 * WHY JSON SERIALIZATION: localStorage only stores strings — objects/arrays must be serialized using JSON.stringify/JSON.parse.
 */
export default function useFavorites() {
  // The lazy initializer () => { ... } inside useState: the function runs only once on mount (deferred evaluation), not on every render
  const [favorites, setFavorites] = useState(() => {
    // Private/Incognito mode can throw SecurityError — must be handled
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : [];
    } catch {
      return [];
    }
  });

  // effect re-runs every time favorites array changes — triggers localStorage sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch(e) {
      console.warn('localStorage unavailable:', e);
    }
  }, [favorites]);

  const toggleFavorite = (attraction) => {
    // The functional update setFavorites(prev => ...): avoids stale closure bug — always reads the latest favorites state
    setFavorites(prev => {
      const exists = prev.find(f => f.id === attraction.id);
      return exists
        ? prev.filter(f => f.id !== attraction.id)
        : [...prev, attraction];
    });
  };

  // coerces undefined to false cleanly
  const isFavorite = (id) => Boolean(favorites.find(f => f.id === id));

  return { favorites, toggleFavorite, isFavorite };
}
