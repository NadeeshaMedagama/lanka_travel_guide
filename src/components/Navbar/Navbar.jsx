import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand" aria-label="Lanka Travel Guide Home">
          🌴 Lanka Travel
        </NavLink>
        <div className="navbar-links">
          <NavLink to="/" end className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            🏠 Explore
          </NavLink>
          <NavLink to="/favorites" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            ❤️ Saved
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
