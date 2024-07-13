import React from 'react';
import { Link } from 'react-router-dom';

function Overlay({ onClose, isOpen }) {
  return (
    <div
      className="overlay"
      style={{ display: isOpen ? 'block' : 'none' }}
      onClick={onClose}
    >
      <nav className="overlay__nav" onClick={(e) => e.stopPropagation()}>
        <ul className='overlay__menu'>
          <Link to="/" onClick={onClose}>
            <li className="nav__link mobile__nav--link">Home</li>
          </Link>
          <Link to="/search" onClick={onClose}>
            <li className="nav__link mobile__nav--link">Find Events</li>
          </Link>
          <Link to="/" onClick={onClose}>
            <li className="nav__link mobile__nav--link">Contact</li>
          </Link>
        </ul>
      </nav>
    </div>
  );
}

export default Overlay;