import React, { useEffect, useState } from 'react';

function SearchCompetitionsPage() {
  const [competitions, setCompetitions] = useState([]);
  const [filteredCompetitions, setFilteredCompetitions] = useState([]);
  const [filters, setFilters] = useState({ type: '', designation: '', date: '' });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/competitions`)
      .then(res => res.json())
      .then(data => {
        setCompetitions(data);
        setFilteredCompetitions(data); // mostra tudo inicialmente
      });
  }, []);

  const handleChange = e => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    const filtered = competitions.filter(comp => {
      const matchesType = filters.type ? comp.type === filters.type : true;
      const matchesDesignation = filters.designation
        ? comp.designation.toLowerCase().includes(filters.designation.toLowerCase())
        : true;
      const matchesDate = filters.date
        ? new Date(comp.date).toISOString().split('T')[0] === filters.date
        : true;

      return matchesType && matchesDesignation && matchesDate;
    });

    setFilteredCompetitions(filtered);
  };

  const handleRegister = async (competitionId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/participants/register/${competitionId}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        alert('Inscrição efetuada com sucesso!');
      } else {
        const error = await res.text();
        alert('Erro: ' + error);
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao inscrever');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Pesquisar Provas</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              name="designation"
              placeholder="Designação"
              value={filters.designation}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-control"
              name="type"
              value={filters.type}
              onChange={handleChange}
            >
              <option value="">Tipo</option>
              <option value="BTT">BTT</option>
              <option value="Trail">Trail</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="date"
              value={filters.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary w-100">Pesquisar</button>
          </div>
        </div>
      </form>

      <ul className="list-group">
        {filteredCompetitions.map(comp => (
          <li key={comp._id} className="list-group-item">
            <strong>{comp.designation}</strong> — {comp.type} — {new Date(comp.date).toLocaleDateString()}
            <button className="btn btn-success btn-sm ms-2" onClick={() => handleRegister(comp._id)}>Inscrever-me</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchCompetitionsPage;
