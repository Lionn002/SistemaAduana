// src/pages/admin/SettingsAdmin.jsx
import React, { useState, useEffect } from 'react';

export default function SettingsAdmin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [message, setMessage] = useState('');

  // Accessibility settings
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [scale, setScale] = useState(
    parseInt(localStorage.getItem('uiScale'), 10) || 100
  );
  const [contrast, setContrast] = useState(
    parseFloat(localStorage.getItem('contrast')) || 1
  );

  useEffect(() => {
    // Load admin name
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.name) setName(user.name);

    // Apply theme
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    // Apply UI scale
    document.documentElement.style.fontSize = `${scale}%`;
    localStorage.setItem('uiScale', scale);
  }, [scale]);

  useEffect(() => {
    // Apply contrast
    document.documentElement.style.filter = `contrast(${contrast})`;
    localStorage.setItem('contrast', contrast);
  }, [contrast]);

  const handleSave = (e) => {
    e.preventDefault();
    if (password && password !== confirmPwd) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    // TODO: llamar al API para guardar contraseña/perfil
    setMessage('Configuración actualizada correctamente');
    setPassword('');
    setConfirmPwd('');
  };

  return (
    <div role="main" className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 role="heading" aria-level="2" className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Ajustes de Administrador
      </h2>
      <form onSubmit={handleSave} className="space-y-6">
        {/* Nombre (solo lectura) */}
        <div>
          <label htmlFor="admin-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
          </label>
          <input
            id="admin-name"
            type="text"
            value={name}
            disabled
            aria-disabled="true"
            className="w-full border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Nueva contraseña */}
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nueva contraseña
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="********"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label htmlFor="admin-confirmPwd" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar contraseña
          </label>
          <input
            id="admin-confirmPwd"
            type="password"
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
            placeholder="********"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        {/* Accessibility settings */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">Tema</legend>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={theme === 'light'}
                onChange={() => setTheme('light')}
                className="form-radio"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Claro</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={theme === 'dark'}
                onChange={() => setTheme('dark')}
                className="form-radio"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Oscuro</span>
            </label>
          </div>

          <div>
            <label htmlFor="scale-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Escala de interfaz ({scale}%)
            </label>
            <input
              id="scale-slider"
              type="range"
              min="50"
              max="150"
              step="1"
              value={scale}
              onChange={e => setScale(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="contrast-slider" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Contraste ({contrast.toFixed(1)}×)
            </label>
            <input
              id="contrast-slider"
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={contrast}
              onChange={e => setContrast(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Estos ajustes ayudan a cumplir con WCAG 2.1 AA: contraste ≥ 4.5:1, tamaños de fuente
            ajustables y modo claro/oscuro.
          </p>
        </fieldset>

        <button
          type="submit"
          className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded hover:bg-secondary/90 transition focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Guardar Cambios
        </button>

        {message && (
          <p role="status" className="mt-2 text-center text-gray-800 dark:text-gray-100">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
