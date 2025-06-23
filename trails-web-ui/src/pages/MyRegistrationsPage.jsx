import React, { useEffect, useState } from 'react';

function MyRegistrationsPage() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/participants/my-competitions`, {
        credentials: 'include',
    })
        .then(res => res.json())
        .then(data => {
        if (Array.isArray(data)) {
            setCompetitions(data);
        } else {
            console.error('Dados inesperados:', data);
            setCompetitions([]);
        }
        });
    }, []);

  return (
    <div className="container mt-4">
      <h2>Minhas Inscrições</h2>
      {competitions.length === 0 ? (
        <p>Não estás inscrito em nenhuma competição.</p>
      ) : (
        <ul className="list-group mt-3">
          {competitions.map(comp => (
            <li key={comp._id} className="list-group-item">
              <strong>{comp.designation}</strong> — {comp.type} em{' '}
              {new Date(comp.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRegistrationsPage;
