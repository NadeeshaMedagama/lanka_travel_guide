import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchAttractionById } from '../../services/api';
import useGeolocation from '../../hooks/useGeolocation';
import useFavorites from '../../hooks/useFavorites';
import { calculateDistance } from '../../utils/distance';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Detail.css';

function Detail() {
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // React Router hook that reads URL parameters from the active route. Route "/attraction/:id" → useParams() returns { id: "5" }. The :id is a named parameter.
  const { id } = useParams();
  
  // Goes back one step in the browser session history stack — equivalent to the browser's back button. navigate('/') would go to home, navigate(-2) goes back two pages.
  const navigate = useNavigate();
  
  // Hook composition: Two custom hooks (useFavorites + useGeolocation) are combined in one component. This is one of React's most powerful patterns — composable logic.
  const { coords, error: geoError, loading: geoLoading, getLocation } = useGeolocation();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchAttractionById(id)
      .then(data => {
        if (!cancelled) {
          setAttraction(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('Attraction not found');
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  // WHY calculateDistance is called here, not in the hook: The hook provides coords; the calculation is a pure utility. Separation of concerns — the hook manages the browser API, the utility does the math.
  const distance = (coords && attraction)
    ? calculateDistance(coords.lat, coords.lng, attraction.lat, attraction.lng)
    : null;

  // Google Maps URL format: https://www.google.com/maps/search/?api=1&query=LAT,LNG — this is a deep-link that opens Google Maps in any browser and shows a pin at those coordinates. On mobile, it may open the native Maps app.
  const mapsUrl = attraction
    ? `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`
    : '#';

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/640x400/e2e8f0/718096?text=Image+Not+Available';
  };

  return (
    <div className="detail-page">
      {loading && <LoadingSpinner />}
      {error && !loading && (
        <div className="detail-error">
          <p>{error}</p>
          <button onClick={() => navigate(-1)} className="back-btn-inline">← Go Back</button>
        </div>
      )}
      {!loading && !error && attraction && (
        <>
          <div className="detail-hero">
            <button onClick={() => navigate(-1)} className="back-btn" aria-label="Go back">← Back</button>
            <img src={attraction.image} alt={attraction.name} loading="eager" className="detail-image" onError={handleImageError} />
            <div className="detail-image-overlay" aria-hidden="true"></div>
          </div>
          <div className="detail-content">
            <div className="detail-badges">
              <span className={`category-badge cat-${attraction.category.toLowerCase()}`}>{attraction.category}</span>
              <span className="detail-rating">⭐ {attraction.rating} / 5</span>
            </div>
            <h1 className="detail-title">{attraction.name}</h1>
            <p className="detail-location">📍 {attraction.location}</p>
            <p className="detail-description">{attraction.description}</p>
            <div className="detail-info-grid">
              <div className="info-item">
                <span className="info-icon">🕒</span>
                <div><strong>Hours</strong><p>{attraction.openHours}</p></div>
              </div>
              <div className="info-item">
                <span className="info-icon">🎟️</span>
                <div><strong>Entry Fee</strong><p>{attraction.entryFee}</p></div>
              </div>
            </div>
            <div className="location-section">
              <h2 className="section-title">📍 Location & Navigation</h2>
              <a href={mapsUrl} target="_blank" rel="noreferrer" className="maps-btn">🗺️ Open in Google Maps</a>
              <div className="geo-section">
                {!coords && !geoLoading && (
                  <button onClick={getLocation} className="geo-btn">📡 Calculate Distance from Me</button>
                )}
                {geoLoading && <p className="geo-loading">📡 Detecting your location...</p>}
                {geoError && <p className="geo-error">⚠️ {geoError}</p>}
                {coords && distance && (
                  <div className="distance-box" aria-live="polite">
                    <span className="distance-number">{distance} km</span>
                    <span className="distance-label">from your current location</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => toggleFavorite(attraction)}
              className={`fav-toggle-btn ${isFavorite(attraction.id) ? 'fav-active' : ''}`}
              aria-pressed={isFavorite(attraction.id)}
            >
              {/* isFavorite(attraction.id) in the render: This reads from the favorites array in localStorage on every render. Because React re-renders when state changes, toggling a favorite immediately updates the button text. This is "derived state" — not stored separately. */}
              {isFavorite(attraction.id) ? '❤️ Saved to Favorites' : '🤍 Add to Favorites'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
