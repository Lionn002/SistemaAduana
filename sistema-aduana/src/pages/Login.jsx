// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import logo from '../assets/logo_aduanas_chile.png';

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.rut === rut && u.password === password);
    if (!user) {
      alert('Credenciales incorrectas');
      return;
    }
    if (user.role === 'admin') {
      navigate('/admin-code', { state: { user } });
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/usuario');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center mb-6">
          {/* Solo agranda el logo: w-80 → w-96 para hacerlo aún más grande */}
          <img
            src={logo}
            alt="Logo Aduanas"
            className="w-96 h-auto mb-4"
          />
          {/* Texto más discreto */}
          <h1 className="text-lg font-semibold text-primary">
            Servicio Nacional de Aduanas
          </h1>
        </div>

        <div className="space-y-4">
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            type="text"
            placeholder="RUT"
            value={rut}
            onChange={e => setRut(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="
              w-full 
              bg-green-600 
              text-white 
              font-bold 
              text-base 
              rounded-lg 
              py-3 
              shadow-lg 
              transition-colors 
              duration-200 
              hover:bg-green-700
            "
          >
            Ingresar
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?{' '}
          <a href="#" className="text-primary hover:underline">
            Recupérala aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
