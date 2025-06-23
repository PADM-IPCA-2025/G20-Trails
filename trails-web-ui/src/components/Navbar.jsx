// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">ProvasApp</Link>
        <div>
          {user ? (
            <>
              <span className="navbar-text me-3">Olá, {user.username}</span>
              <button className="btn btn-outline-light" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-light" to="/register">Registo</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
