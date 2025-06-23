import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateParticipantPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    surname: '',
    mobilePhoneNumber: '',
    email: '',
    birthDate: '',
    address: '',
    height: '',
    weight: '',
    municipality: '',
    region: '',
    country: '',
    gender: 'male',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_API_URL}/participants`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate('/participant');
    } else {
      alert('Erro ao criar perfil de participante');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Criar Perfil de Participante</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label>Primeiro Nome</label>
            <input className="form-control" name="firstName" onChange={handleChange} required />
          </div>
          <div className="col">
            <label>Apelido</label>
            <input className="form-control" name="surname" onChange={handleChange} required />
          </div>
        </div>

        <label className="mt-2">Telemóvel</label>
        <input className="form-control" name="mobilePhoneNumber" onChange={handleChange} required />

        <label className="mt-2">Email</label>
        <input className="form-control" name="email" onChange={handleChange} required />

        <label className="mt-2">Data de Nascimento</label>
        <input type="date" className="form-control" name="birthDate" onChange={handleChange} required />

        <label className="mt-2">Morada</label>
        <input className="form-control" name="address" onChange={handleChange} required />

        <div className="row mt-2">
          <div className="col">
            <label>Altura (cm)</label>
            <input type="number" className="form-control" name="height" onChange={handleChange} required />
          </div>
          <div className="col">
            <label>Peso (kg)</label>
            <input type="number" className="form-control" name="weight" onChange={handleChange} required />
          </div>
        </div>

        <label className="mt-2">Concelho</label>
        <input className="form-control" name="municipality" onChange={handleChange} required />

        <label className="mt-2">Região</label>
        <input className="form-control" name="region" onChange={handleChange} />

        <label className="mt-2">País</label>
        <input className="form-control" name="country" onChange={handleChange} required />

        <label className="mt-2">Género</label>
        <select className="form-select" name="gender" onChange={handleChange} required>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>

        <button className="btn btn-success mt-3" type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default CreateParticipantPage;
