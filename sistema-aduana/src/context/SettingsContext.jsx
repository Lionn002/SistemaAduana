// src/context/SettingsContext.jsx
import { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [scale, setScale] = useState(1);
  const [contrast, setContrast] = useState(1);

  // Carga inicial desde localStorage, si existe
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('settings'));
    if (stored) {
      setDarkMode(stored.darkMode);
      setScale(stored.scale);
      setContrast(stored.contrast);
    }
  }, []);

  // Aplica cambios de tema, escala y contraste
  useEffect(() => {
    // añade/quita la clase 'dark' del <html>
    document.documentElement.classList.toggle('dark', darkMode);
    // escala global de fuente
    document.documentElement.style.fontSize = `${16 * scale}px`;
    // contraste global
    document.documentElement.style.filter = `contrast(${contrast})`;
    // guarda en localStorage
    localStorage.setItem(
      'settings',
      JSON.stringify({ darkMode, scale, contrast })
    );
  }, [darkMode, scale, contrast]);

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, scale, setScale, contrast, setContrast }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
