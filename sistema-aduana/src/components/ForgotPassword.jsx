import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, validate } from 'rut.js';
import logo from '../assets/logo_aduanas_chile.png';

export default function ForgotPassword() {
  const [rut, setRut] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    // Permite solo dígitos y K/k
    let raw = e.target.value.replace(/[^0-9kK]/g, '').toUpperCase();

    // Una sola K
    const parts = raw.split('K');
    if (parts.length > 2) raw = parts[0] + 'K';

    // Formatea puntos y guión
    setRut(format(raw));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rut || !validate(rut)) {
      setError('Ingrese un RUT válido');
      return;
    }
    const clean = rut.replace(/\./g, '').replace('-', '');
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem(`resetCode_${clean}`, code);
    console.log(`Código de recuperación para ${clean}: ${code}`);
    navigate('/restablecer-contrasena', { state: { rut: clean } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Aduanas Chile" className="w-32 h-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-4">
          Recuperar contraseña
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fp-rut" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              RUT registrado
            </label>
            <input
              id="fp-rut"
              type="text"
              placeholder="12.345.678-K"
              value={rut}
              onChange={handleChange}
              maxLength={12}
              className="mt-1 block w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {error && (
              <p role="alert" className="text-red-500 text-sm mt-1">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary dark:bg-secondary/80 text-white font-semibold py-2 rounded-lg hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            Enviar código
          </button>
        </form>
      </div>
    </div>
  );
}
