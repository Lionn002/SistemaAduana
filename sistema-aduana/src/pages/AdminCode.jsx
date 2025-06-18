// src/pages/AdminCode.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_aduanas_chile.png';

export default function AdminCode() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    const locationUser = state?.user;
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const currentUser = locationUser || storedUser;

    // Solo admin y funcionarios pueden acceder
    if (!currentUser || !['admin','PDI','SAG','ADUANA'].includes(currentUser.role)) {
      return navigate('/');
    }

    localStorage.setItem('user', JSON.stringify(currentUser));
    setUser(currentUser);

    // Generar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Código generado:', code);
    setGeneratedCode(code);
  }, [state, navigate]);

  if (!user) return null;

  const handleVerify = () => {
    if (inputCode === generatedCode) {
      if (user.role === 'admin') {
        navigate('/admin', { state: { user } });
      } else {
        navigate('/funcionario', { state: { user } });
      }
    } else {
      alert('Código incorrecto, inténtalo de nuevo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-md w-full text-center">
        <img src={logo} alt="Logo" className="w-56 h-auto mx-auto mb-6" />
        <h1 className="text-2xl font-semibold mb-1 dark:text-white">Bienvenido, {user.name}</h1>
        <p className="text-sm dark:text-gray-300 mb-4">ROL: {user.role}</p>
        <p className="dark:text-gray-400 mb-4">
          Se ha enviado un SMS con el código. Ingresa el código recibido.
        </p>
        <input
          type="text"
          maxLength={6}
          placeholder="Código de verificación"
          value={inputCode}
          onChange={e => setInputCode(e.target.value)}
          className="w-full border dark:border-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary text-center"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded-lg hover:bg-secondary/90 transition"
        >
          Verificar
        </button>
      </div>
      <footer className="mt-8 text-white text-sm">© 2025 Servicio Nacional de Aduanas</footer>
    </div>
  );
}
