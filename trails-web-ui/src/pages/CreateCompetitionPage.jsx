import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function CreateCompetitionPage() {
  const { id } = useParams(); // ID da entidade
  const navigate = useNavigate();

  const [form, setForm] = useState({
    designation: '',
    type: 'BTT',
    date: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/competitions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, entity: id }),
    });

    if (res.ok) {
      navigate(`/admin/entities/${id}/competitions`);
    } else {
      alert('Erro ao criar a prova.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Nova Prova</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Designação</label>
          <input
            name="designation"
            className="form-control"
            value={form.designation}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select name="type" className="form-control" value={form.type} onChange={handleChange}>
            <option value="BTT">BTT</option>
            <option value="Trail">Trail</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Data</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">Criar</button>
        <Link to={`/admin/entities/${id}/competitions`} className="btn btn-secondary ms-2">Cancelar</Link>
      </form>
    </div>
  );
}

export default CreateCompetitionPage;
