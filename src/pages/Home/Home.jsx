import React, { useState, useEffect } from 'react';
import { fetchByCategory } from '../../services/api';
import AttractionCard from '../../components/AttractionCard/AttractionCard';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useFavorites from '../../hooks/useFavorites';
import './Home.css';

const CATEGORIES = ['All', 'Nature', 'Historical', 'Hotels'];

function Home() {
  // THREE-STATE ASYNC PATTERN: loading/error/data — all three are needed simultaneously. 
  // A request can be loading (show spinner), failed (show error), or succeeded (show data). Two states are not enough.
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const { toggleFavorite, isFavorite } = useFavorites();

  const loadAttractions = async (category, isMounted = { current: true }) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchByCategory(category);
      if (isMounted.current) {
        setAttractions(data);
      }
    } catch (err) {
      if (isMounted.current) {
        // mode-aware message: the json-server hint only applies when an API URL is configured (local dev)
        setError(
          import.meta.env.VITE_API_URL
            ? 'Could not load attractions. Is the API server running? Open a terminal and run: npm run api'
            : 'Could not load attractions. Please check your connection and try again.'
        );
      }
    } finally {
      // setLoading(false) in finally guarantees loading is cleared whether the fetch succeeded or failed. 
      // Without finally, a failed request would leave the spinner spinning forever.
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  // WHY useEffect for data fetching: React renders must be pure (no side effects). Fetching data is a side effect. 
  // useEffect runs AFTER the render is committed to the DOM.
  useEffect(() => {
    const isMounted = { current: true };
    loadAttractions(activeCategory, isMounted);
    return () => {
      isMounted.current = false;
    };
  // Dependency array [activeCategory]: useEffect re-runs when activeCategory changes. This triggers a fresh API call 
  // for the newly selected category. Empty array [] would only run once; no array would run every render (infinite loop).
  }, [activeCategory]);

  return (
    <div className="home-container">
      <section className="hero-section" aria-label="Welcome banner">
        <div className="hero-content">
          <p className="hero-eyebrow">🇱🇰 Wonder of Asia</p>
          <h1 className="hero-title">Discover Sri Lanka</h1>
          <p className="hero-subtitle">Beaches · History · Nature · Luxury</p>
        </div>
      </section>
      <section className="content-section" aria-label="Attractions">
        <CategoryFilter categories={CATEGORIES} activeCategory={activeCategory} onSelect={setActiveCategory} />
        
        {/* Conditional rendering pattern (!loading && !error && data.length > 0) */}
        {!loading && !error && (
          <p className="result-count">
            {attractions.length} place{attractions.length !== 1 ? 's' : ''} found in <strong>{activeCategory}</strong>
          </p>
        )}
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="error-state" role="alert">
            <span className="error-icon">⚠️</span>
            <p>{error}</p>
            <button className="retry-btn" onClick={() => loadAttractions(activeCategory)}>↻ Try Again</button>
          </div>
        )}
        
        {/* Conditional rendering pattern: guards ensure we never try to render attraction cards before data arrives. */}
        {!loading && !error && attractions.length === 0 && (
          <div className="empty-state"><p>No attractions found in this category.</p></div>
        )}
        
        {!loading && !error && attractions.length > 0 && (
          <div className="attractions-grid">
            {attractions.map((attr, index) => (
              <AttractionCard
                // WHY key={attr.id}: React's reconciliation algorithm (the virtual DOM diff) uses key to identify 
                // which list items changed, were added, or removed. Without unique keys, React re-renders the 
                // entire list on every change, causing bugs and performance issues.
                key={attr.id}
                attraction={attr}
                isFavorite={isFavorite(attr.id)}
                onToggleFavorite={() => toggleFavorite(attr)}
                style={{ '--i': index }}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
