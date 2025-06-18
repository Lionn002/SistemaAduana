import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children, role, roles }) {
  const location = useLocation();
  // Intentamos leer el user de location.state o de localStorage
  const stateUser = location.state?.user;
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const user = stateUser || storedUser;

  // Si no hay usuario, redirigimos al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si recibimos prop `role` y no coincide, redirigimos al login
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  // Si recibimos prop `roles` (array) y el rol del usuario no está incluido, redirigimos
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Si pasa todas las validaciones, renderizamos el hijo
  return children;
}
