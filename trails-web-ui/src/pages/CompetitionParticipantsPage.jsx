import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function CompetitionParticipantsPage() {
  const { id } = useParams(); // id da competição
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/competitions/${id}/participants`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.error('Erro ao buscar participantes:', err));
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Participantes Inscritos</h2>
      {participants.length === 0 ? (
        <p>Nenhum participante inscrito nesta prova.</p>
      ) : (
        <ul className="list-group mt-3">
          {participants.map(p => (
            <li key={p._id} className="list-group-item">
              {p.firstName} {p.surname} - {p.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CompetitionParticipantsPage;
