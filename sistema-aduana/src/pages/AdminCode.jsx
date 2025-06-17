// src/pages/AdminCode.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_aduanas_chile.png';

const AdminCode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inputCode, setInputCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    // Obtenemos el user de location.state o de localStorage
    const locationUser = state?.user;
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const currentUser = locationUser || storedUser;

    // Si no es un funcionario válido, redirigimos al login
    if (!currentUser || !['PDI','SAG','ADUANA'].includes(currentUser.role)) {
      return navigate('/');
    }

    // Guardamos en localStorage y en estado
    localStorage.setItem('user', JSON.stringify(currentUser));
    setUser(currentUser);

    // Generamos y mostramos en consola el código de verificación
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Código funcionario generado:', code);
    setGeneratedCode(code);
  }, [state, navigate]);

  if (!user) return null;

  const handleVerify = () => {
    if (inputCode === generatedCode) {
      // Al verificar correctamente, vamos al dashboard de funcionario
      navigate('/funcionario', { state: { user } });
    } else {
      alert('Código incorrecto, inténtalo de nuevo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full mx-auto">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Aduanas" className="w-56 h-auto" />
        </div>

        <h1 className="text-2xl font-semibold text-primary dark:text-secondary text-center mb-1">
          Bienvenido, {user.name}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
          ROL: {user.role}
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
          Se ha enviado un SMS al teléfono registrado. Introduce el código recibido.
        </p>

        <input
          type="text"
          maxLength={6}
          placeholder="Código de verificación"
          value={inputCode}
          onChange={e => setInputCode(e.target.value)}
          className="w-full text-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-secondary"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-secondary text-white font-bold py-2 rounded-lg hover:bg-secondary/90 transition"
        >
          Verificar
        </button>
      </div>

      <footer className="mt-8 text-center text-white text-sm">
        © 2025 Servicio Nacional de Aduanas. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default AdminCode;
