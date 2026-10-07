import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Simple dummy authentication check
  const isAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect unauthenticated users to the standalone login page
    return <Navigate to="/admin" replace />;
  }

  // Render the protected component
  return children;
}

export default ProtectedRoute;
