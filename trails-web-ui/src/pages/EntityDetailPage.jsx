import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function EntityDetailPage() {
  const { id } = useParams();
  const [entity, setEntity] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/entities/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setEntity(data))
      .catch(err => console.error('Erro ao carregar entidade:', err));
  }, [id]);

  if (!entity) return <p>A carregar...</p>;

  return (
    <div className="container mt-4">
      <h2>Detalhes da Entidade</h2>
      <ul className="list-group">
        <li className="list-group-item"><strong>Designação:</strong> {entity.designation}</li>
        <li className="list-group-item"><strong>Tipo:</strong> {entity.type}</li>
      </ul>

      <div className="mb-3">
        <Link to={`/admin/entities/${entity._id}/competitions`} className="btn btn-sm btn-outline-primary">
          Ver Provas
        </Link>
      </div>
    </div>
  );
}

export default EntityDetailPage;
