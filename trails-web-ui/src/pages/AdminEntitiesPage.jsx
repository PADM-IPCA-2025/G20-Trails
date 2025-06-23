// src/pages/AdminEntitiesPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AdminEntitiesPage() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/entities/my`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {console.log('Entidades recebidas:', data); setEntities(data)});
  }, []);

  return (
    <div className="container mt-4">
      <h2>Minhas Entidades</h2>

      <div className="mb-3">
        <Link to="/admin/entities/create" className="btn btn-success">
          Criar Nova Entidade
        </Link>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Designação</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {entities.map(entity => (
            <tr key={entity._id}>
              <td>{entity.designation}</td>
              <td>{entity.type}</td>
              <td><Link to={`/admin/entities/${entity._id}`}>Detalhe</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminEntitiesPage;
