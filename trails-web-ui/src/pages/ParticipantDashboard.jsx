import React from 'react';
import { Link } from 'react-router-dom';

function ParticipantDashboard() {
  return (
    <div className="container mt-4">
      <h2>Dashboard do Participante</h2>
      <ul className="list-group mt-3">
        <li className="list-group-item">
          <Link to="/participant/create">Criar Perfil de Participante</Link>
        </li>
        <li className="list-group-item">
          <Link to="/participant/search-competitions">Pesquisar Provas</Link>
        </li>
        <li className="list-group-item">
          <Link to="/participant/registrations">Minhas Inscrições</Link>
        </li>
      </ul>
    </div>
  );
}
export default ParticipantDashboard;
