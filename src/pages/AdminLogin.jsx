import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SolarLogin from '../components/SolarLogin';

function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = async ({ username, password, mode }) => {
    if (mode === 'signup') {
      // Simulate signup behavior
      throw new Error('New employee accounts require HR approval. Please contact administration.');
    }

    // Login mode
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdminAuthenticated', 'true');
      navigate('/admin/panel');
    } else {
      throw new Error('Invalid credentials. Access denied.');
    }
  };

  return <SolarLogin onLogin={handleLogin} hideSignup={true} />;
}

export default AdminLogin;
