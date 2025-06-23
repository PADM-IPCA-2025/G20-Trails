import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EntityCompetitionsPage() {
  const { id } = useParams();
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/competitions/entity/${id}`)
      .then(res => res.json())
      .then(data => setCompetitions(data));
  }, [id]);

  return (
    <div className="container mt-4">

     <Link to={`/admin/entities/${id}/competitions/create`} className="btn btn-success mb-3">
        Criar Nova Prova
     </Link>

      <h2>Provas da Entidade</h2>
      {competitions.length === 0 ? (
        <p>Sem provas registadas.</p>
      ) : (
        <ul className="list-group">
          {competitions.map(comp => (
            <li key={comp._id} className="list-group-item">
              <strong>{comp.designation}</strong> - {comp.type} - {new Date(comp.date).toLocaleDateString()}
              <Link to={`/admin/competitions/${comp._id}/participants`}> Ver Participantes</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/admin/entities" className="btn btn-secondary mt-3">Voltar</Link>
    </div>
  );
}

export default EntityCompetitionsPage;
