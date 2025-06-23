// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import ParticipantDashboard from './pages/ParticipantDashboard';
import AdminEntitiesPage from './pages/AdminEntitiesPage';
import AdminCreateEntityPage from './pages/AdminCreateEntityPage';
import EntityDetailPage from './pages/EntityDetailPage';
import EntityCompetitionsPage from './pages/EntityCompetitionsPage';
import CreateCompetitionPage from './pages/CreateCompetitionPage';
import CreateParticipantPage from './pages/CreateParticipantPage';
import SearchCompetitionsPage from './pages/SearchCompetitionsPage';
import MyRegistrationsPage from './pages/MyRegistrationsPage';
import CompetitionParticipantsPage from './pages/CompetitionParticipantsPage';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/auth/session`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        //console.log('Dados da sessão:', data);
        if (data.user) setUser(data.user);
      });
  }, []);

  // Navega para o dashboard correto quando o user muda
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        if (!location.pathname.startsWith('/admin')) {
          navigate('/admin');
        }
      }
      else if (user.role === 'participant'){
        if (!location.pathname.startsWith('/participant')){
          navigate('/participant');
        }
      } 
    }
  }, [user, location.pathname, navigate]);

  const handleLogout = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <RegisterPage />} />

        <Route
          path="/admin"
          element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/entities"
          element={user?.role === 'admin' ? <AdminEntitiesPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/entities/create"
          element={user?.role === 'admin' ? <AdminCreateEntityPage /> : <Navigate to="/login" />}
        />  

        <Route
          path="/admin/entities/:id"
          element={user?.role === 'admin' ? <EntityDetailPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/entities/:id/competitions"
          element={user?.role === 'admin' ? <EntityCompetitionsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/entities/:id/competitions/create"
          element={user?.role === 'admin' ? <CreateCompetitionPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/participant"
          element={user?.role === 'participant' ? <ParticipantDashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/participant/create"
          element={user?.role === 'participant' ? <CreateParticipantPage /> : <Navigate to="/login" />}
        />

         <Route
          path="/participant/search-competitions"
          element={user?.role === 'participant' ? <SearchCompetitionsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/participant/registrations"
          element={user?.role === 'participant' ? <MyRegistrationsPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/admin/competitions/:id/participants"
          element={user?.role === 'admin' ? <CompetitionParticipantsPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
