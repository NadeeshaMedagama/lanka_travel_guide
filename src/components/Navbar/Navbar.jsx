import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" aria-label="Lanka Travel Guide Home">
          <span aria-hidden="true">🌴</span>
          <span className="brand-text">Lanka Travel</span>
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/" end aria-label="Explore" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <span aria-hidden="true">🏠</span><span className="nav-text">Explore</span>
          </NavLink>
          <NavLink to="/favorites" aria-label="Saved favorites" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <span aria-hidden="true">❤️</span><span className="nav-text">Saved</span>
          </NavLink>
          <NavLink to="/contact" aria-label="Plan your trip" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            <span aria-hidden="true">📩</span><span className="nav-text">Plan</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
