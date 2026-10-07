import React from 'react';
import { useNavigate } from 'react-router-dom';
import SolarLogin from '../components/SolarLogin';

function EmployeePortal() {
  const navigate = useNavigate();

  const handlePortalLogin = async ({ username, password, mode }) => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees') || '[]');

    if (mode === 'signup') {
      const exists = storedEmployees.find(e => e.username === username);
      if (exists) {
        throw new Error('Username already taken. Please choose another.');
      }
      const newEmp = { username, password, role: 'Applicant', status: 'Pending HR' };
      localStorage.setItem('employees', JSON.stringify([...storedEmployees, newEmp]));
      alert('Sign up successful! Your account is pending HR approval.');
      return;
    }

    // Login mode
    const user = storedEmployees.find(e => e.username === username && e.password === password);
    if (!user) {
      throw new Error('Invalid employee credentials. Access denied.');
    }

    if (user.status !== 'Active') {
      throw new Error('Account is pending HR approval. Please contact administration.');
    }

    // Set authenticated user context
    localStorage.setItem('currentEmployee', JSON.stringify({ username: user.username, role: user.role }));
    navigate('/employee-dashboard');
  };

  return <SolarLogin onLogin={handlePortalLogin} />; // Signup is enabled here!
}

export default EmployeePortal;
