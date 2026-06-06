import React from 'react';
import './CategoryFilter.css';

const CATEGORY_ICONS = { All: '🌐', Nature: '🌿', Historical: '🏛️', Hotels: '🏨' };

function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="filter-wrapper" role="tablist" aria-label="Filter by category">
      {categories.map(cat => (
        <button
          key={cat}
          role="tab"
          aria-selected={activeCategory === cat}
          className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
          onClick={() => onSelect(cat)}
        >
          <span className="filter-icon">{CATEGORY_ICONS[cat] || '📍'}</span>
          <span>{cat}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
