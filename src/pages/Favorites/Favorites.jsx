import React from 'react';
import { Link } from 'react-router-dom';
import useFavorites from '../../hooks/useFavorites';
import AttractionCard from '../../components/AttractionCard/AttractionCard';
import './Favorites.css';

function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <div className="favorites-page">
      <header className="fav-header">
        <h1 className="fav-title">❤️ My Favorites</h1>
        <span className="fav-count-badge">{favorites.length} saved</span>
      </header>
      {favorites.length === 0 ? (
        <div className="fav-empty" role="status">
          <div className="empty-icon" aria-hidden="true">🗺️</div>
          <h2>No saved places yet</h2>
          <p>Tap ❤️ on any attraction card to save it here. Your favorites persist even after closing the browser.</p>
          <Link to="/" className="explore-link">🌴 Start Exploring</Link>
        </div>
      ) : (
        <div className="attractions-grid">
          {favorites.map(attr => (
            <AttractionCard
              key={attr.id}
              attraction={attr}
              isFavorite={isFavorite(attr.id)}
              onToggleFavorite={() => toggleFavorite(attr)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
