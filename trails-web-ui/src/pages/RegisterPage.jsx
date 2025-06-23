// src/pages/RegisterPage.jsx
import React, { useState } from 'react';

function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '', role: 'participant' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert('Utilizador registado com sucesso!');
    } else {
      alert('Erro no registo');
    }
  };

  return (
    <div className="container">
      <h2>Registar</h2>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label className="form-label">Utilizador</label>
          <input
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Palavra-passe</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Função</label>
          <select
            className="form-select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="participant">Participante</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-success">Registar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
