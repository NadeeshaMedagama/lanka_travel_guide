import React from 'react';
import { Link } from 'react-router-dom';
import './AttractionCard.css';

function AttractionCard({ attraction, isFavorite, onToggleFavorite }) {
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/640x400/e2e8f0/718096?text=Image+Not+Available';
  };

  return (
    <article className="attraction-card">
      <Link to={`/attraction/${attraction.id}`} className="card-link" aria-label={`View details for ${attraction.name}`}>
        <div className="card-image-wrapper">
          <img
            src={attraction.image} alt={attraction.name}
            loading="lazy" onError={handleImageError}
            className="card-image"
          />
          <span className={`category-badge cat-${attraction.category.toLowerCase()}`}>
            {attraction.category}
          </span>
          <span className="rating-badge">⭐ {attraction.rating}</span>
        </div>
        <div className="card-body">
          <h3 className="card-title">{attraction.name}</h3>
          <p className="card-location">📍 {attraction.location}</p>
          <p className="card-fee">🎟️ {attraction.entryFee}</p>
        </div>
      </Link>
      <button
        className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onToggleFavorite(); }}
        aria-label={isFavorite ? `Remove ${attraction.name} from favorites` : `Add ${attraction.name} to favorites`}
        aria-pressed={isFavorite}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </article>
  );
}

export default AttractionCard;
