// src/routes/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, role, roles }) {
  const location = useLocation();

  // Siempre obtenemos el usuario desde localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // No hay sesión activa
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Validación individual
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Validación múltiple
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
