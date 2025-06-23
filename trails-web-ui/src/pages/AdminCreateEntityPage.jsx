// src/pages/AdminCreateEntityPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCreateEntityPage() {
  const [form, setForm] = useState({
    designation: '',
    type: 'Empresa',
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/entities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate('/admin/entities');
    } else {
      alert('Erro ao criar entidade');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Nova Entidade</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Designação</label>
          <input
            className="form-control"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo</label>
          <select
            className="form-select"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="Empresa">Empresa</option>
            <option value="Associação">Associação</option>
            <option value="Organismo público">Organismo público</option>
          </select>
        </div>

        <button className="btn btn-primary">Criar</button>
      </form>
    </div>
  );
}

export default AdminCreateEntityPage;
