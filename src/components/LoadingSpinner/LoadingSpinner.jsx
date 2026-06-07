import React from 'react';
import './LoadingSpinner.css';

function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner" role="status" aria-label="Loading content"></div>
      <p className="spinner-text">Loading attractions...</p>
    </div>
  );
}

export default LoadingSpinner;
