// src/pages/AdminCode.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_aduanas_chile.png';

const AdminCode = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user;

  const [inputCode, setInputCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      return navigate('/');
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Código admin generado:', code);
    setGeneratedCode(code);
  }, [user, navigate]);

  const handleVerify = () => {
    if (inputCode === generatedCode) {
      navigate('/admin');
    } else {
      alert('Código incorrecto, inténtalo de nuevo');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-3xl shadow-2xl 
          p-8 max-w-md w-full mx-auto
        "
      >
        {/* Logo aumentado */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Aduanas" className="w-56 h-auto" />
        </div>

        {/* Bienvenida con nombre */}
        <h1 className="text-2xl font-semibold text-primary dark:text-secondary text-center mb-2">
          Bienvenido, {user?.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
          Verificación de funcionario
        </p>

        {/* Simulación de envío de SMS */}
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-4">
          Se ha enviado un SMS al teléfono registrado. Introduce el código recibido.
        </p>

        {/* Input código */}
        <input
          type="text"
          maxLength={6}
          placeholder="Código de verificación"
          value={inputCode}
          onChange={e => setInputCode(e.target.value)}
          className="
            w-full text-center
            border border-gray-300 dark:border-gray-600
            rounded-lg px-4 py-2 mb-4
            focus:outline-none focus:ring-2 focus:ring-secondary
          "
        />

        {/* Botón verificar */}
        <button
          onClick={handleVerify}
          className="
            w-full bg-secondary text-white
            font-bold py-2 rounded-lg
            hover:bg-secondary/90 transition
          "
        >
          Verificar
        </button>
      </div>

      {/* Footer con texto blanco */}
      <footer className="mt-8 text-center text-white text-sm">
        © 2025 Servicio Nacional de Aduanas. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default AdminCode;
