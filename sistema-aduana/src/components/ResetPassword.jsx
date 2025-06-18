// src/components/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format, validate } from 'rut.js';
import logo from '../assets/logo_aduanas_chile.png';

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const rawRut = state?.rut || '';
  const [rut, setRut] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // on mount, format rut with dots and dash
  useEffect(() => {
    if (rawRut) {
      setRut(format(rawRut));
    }
  }, [rawRut]);

  const handleSubmit = e => {
    e.preventDefault();
    const savedCode = localStorage.getItem(`resetCode_${rut.replace(/\./g, '').replace('-', '')}`);
    if (!savedCode || codeInput !== savedCode) {
      setError('Código incorrecto');
      return;
    }
    if (!password || password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (password !== confirmPwd) {
      setError('Las contraseñas no coinciden');
      return;
    }
    // TODO: llamada al API para actualizar contraseña
    setMessage('Contraseña actualizada con éxito');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Aduanas Chile" className="w-32 h-auto" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 text-center mb-6">
          Restablecer contraseña
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              RUT
            </label>
            <div className="text-gray-900 dark:text-gray-100 font-medium">
              {rut}
            </div>
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Código de recuperación
            </label>
            <input
              id="code"
              type="text"
              maxLength={6}
              value={codeInput}
              onChange={e => { setCodeInput(e.target.value); setError(''); }}
              className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label htmlFor="new-pass" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nueva contraseña
            </label>
            <input
              id="new-pass"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="********"
              className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label htmlFor="confirm-pass" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirmar contraseña
            </label>
            <input
              id="confirm-pass"
              type="password"
              value={confirmPwd}
              onChange={e => { setConfirmPwd(e.target.value); setError(''); }}
              placeholder="********"
              className="w-full border dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          {error && (
            <p role="alert" className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="text-green-500 text-sm text-center">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-secondary dark:bg-secondary/80 text-white font-semibold py-3 rounded-lg hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary transition"
          >
            Restablecer contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
