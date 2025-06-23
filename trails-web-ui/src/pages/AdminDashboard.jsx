// src/pages/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard do Administrador</h2>
        <ul className="list-group mt-3">
          <li className="list-group-item">
            <Link to="/admin/entities">Gerir Entidades</Link>
        </li>
     </ul>
    </div>
  );
}
export default AdminDashboard;
