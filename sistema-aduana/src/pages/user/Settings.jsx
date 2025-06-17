import { useContext } from 'react';
import { SettingsContext } from '../../context/SettingsContext';

const Settings = () => {
  const { darkMode, setDarkMode, scale, setScale, contrast, setContrast } =
    useContext(SettingsContext);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-primary dark:text-secondary">
        Ajustes de usuario
      </h2>

      <div className="space-y-6">
        {/* Tema */}
        <div>
          <label className="block font-semibold mb-2 dark:text-gray-200">
            Tema:
          </label>
          <button
            onClick={() => setDarkMode(false)}
            className={`mr-2 px-4 py-2 rounded ${
              !darkMode
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            Claro
          </button>
          <button
            onClick={() => setDarkMode(true)}
            className={`px-4 py-2 rounded ${
              darkMode
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
            }`}
          >
            Oscuro
          </button>
        </div>

        {/* Escala global */}
        <div>
          <label className="block font-semibold mb-2 dark:text-gray-200">
            Escala de interfaz ({Math.round(scale * 100)}%)
          </label>
          <input
            type="range"
            min="0.8"
            max="1.5"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Contraste */}
        <div>
          <label className="block font-semibold mb-2 dark:text-gray-200">
            Contraste ({contrast.toFixed(1)})
          </label>
          <input
            type="range"
            min="1"
            max="2"
            step="0.1"
            value={contrast}
            onChange={(e) => setContrast(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
