// src/pages/user/Settings.jsx
import React, { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';
import { Sun, Moon } from 'lucide-react';

export default function Settings() {
  const { darkMode, setDarkMode, scale, setScale, contrast, setContrast } =
    useContext(SettingsContext);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-secondary">
        Ajustes de usuario
      </h2>

      {/* Tema */}
      <div role="region" aria-labelledby="settings-theme" className="mb-6">
        <h3 id="settings-theme" className="block font-semibold mb-2 dark:text-gray-200">
          Tema
        </h3>
        <button
          onClick={() => setDarkMode(false)}
          aria-pressed={!darkMode}
          aria-label="Modo claro"
          className={`mr-2 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary ${
            !darkMode
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          <Sun className="inline w-5 h-5" /> Claro
        </button>
        <button
          onClick={() => setDarkMode(true)}
          aria-pressed={darkMode}
          aria-label="Modo oscuro"
          className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary ${
            darkMode
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}
        >
          <Moon className="inline w-5 h-5" /> Oscuro
        </button>
      </div>

      {/* Escala global */}
      <div role="region" aria-labelledby="settings-scale" className="mb-6">
        <label
          id="settings-scale"
          className="block font-semibold mb-2 dark:text-gray-200"
          htmlFor="scale-range"
        >
          Escala de interfaz ({Math.round(scale * 100)}%)
        </label>
        <input
          id="scale-range"
          type="range"
          min="0.8"
          max="1.5"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          aria-valuemin={0.8}
          aria-valuemax={1.5}
          aria-valuenow={scale}
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Contraste */}
      <div role="region" aria-labelledby="settings-contrast" className="mb-6">
        <label
          id="settings-contrast"
          className="block font-semibold mb-2 dark:text-gray-200"
          htmlFor="contrast-range"
        >
          Contraste ({contrast.toFixed(1)}×)
        </label>
        <input
          id="contrast-range"
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={contrast}
          onChange={(e) => setContrast(parseFloat(e.target.value))}
          aria-valuemin={1}
          aria-valuemax={2}
          aria-valuenow={contrast}
          className="w-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        Estos ajustes ayudan a cumplir con WCAG 2.1 AA: contraste ≥ 4.5:1, tamaños de
        fuente ajustables y modo oscuro/claro.
      </p>
    </div>
  );
}
