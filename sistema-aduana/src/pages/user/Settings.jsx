// src/pages/user/Settings.jsx
import React, { useContext, useEffect, useState } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { Sun, Moon } from 'lucide-react';

export default function Settings() {
  const { darkMode, setDarkMode, scale, setScale, contrast, setContrast } =
    useContext(SettingsContext);

  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [message, setMessage] = useState('');

  // Apply theme to <html> and persist
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Apply UI scale and persist
  useEffect(() => {
    document.documentElement.style.fontSize = `${Math.round(scale * 100)}%`;
    localStorage.setItem('uiScale', scale.toString());
  }, [scale]);

  // Apply contrast filter and persist
  useEffect(() => {
    document.documentElement.style.filter = `contrast(${contrast})`;
    localStorage.setItem('contrast', contrast.toString());
  }, [contrast]);

  const handleSave = (e) => {
    e.preventDefault();
    if (password && password !== confirmPwd) {
      setMessage('Las contraseñas no coinciden');
      return;
    }
    // TODO: llamada al API para actualizar contraseña/perfil
    setMessage('Configuración actualizada correctamente');
    setPassword('');
    setConfirmPwd('');
  };

  return (
    <div role="main" className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 role="heading" aria-level="2" className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Ajustes de usuario
      </h2>
      <form onSubmit={handleSave} className="space-y-6">
        {/* Nueva contraseña */}
        <div>
          <label htmlFor="user-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nueva contraseña
          </label>
          <input
            id="user-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="********"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-required="false"
          />
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label htmlFor="user-confirmPwd" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar contraseña
          </label>
          <input
            id="user-confirmPwd"
            type="password"
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
            placeholder="********"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-required="false"
          />
        </div>

        {/* Tema */}
        <fieldset role="region" aria-labelledby="settings-theme" className="space-y-4">
          <legend id="settings-theme" className="block font-semibold text-gray-700 dark:text-gray-300">
            Tema
          </legend>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setDarkMode(false)}
              aria-pressed={!darkMode}
              aria-label="Modo claro"
              className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary ${
                !darkMode
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <Sun className="inline w-5 h-5 mr-1" /> Claro
            </button>
            <button
              type="button"
              onClick={() => setDarkMode(true)}
              aria-pressed={darkMode}
              aria-label="Modo oscuro"
              className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary ${
                darkMode
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              <Moon className="inline w-5 h-5 mr-1" /> Oscuro
            </button>
          </div>
        </fieldset>

        {/* Escala global */}
        <div role="region" aria-labelledby="settings-scale">
          <label
            id="settings-scale"
            htmlFor="scale-range"
            className="block font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Escala de interfaz ({Math.round(scale * 100)}%)
          </label>
          <input
            id="scale-range"
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={scale}
            onChange={e => setScale(parseFloat(e.target.value))}
            aria-valuemin={0.5}
            aria-valuemax={1.5}
            aria-valuenow={scale}
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Contraste */}
        <div role="region" aria-labelledby="settings-contrast">
          <label
            id="settings-contrast"
            htmlFor="contrast-range"
            className="block font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            Contraste ({contrast.toFixed(1)}×)
          </label>
          <input
            id="contrast-range"
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={contrast}
            onChange={e => setContrast(parseFloat(e.target.value))}
            aria-valuemin={1}
            aria-valuemax={3}
            aria-valuenow={contrast}
            className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded hover:bg-secondary/90 transition focus:outline-none focus:ring-2 focus:ring-primary"
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
