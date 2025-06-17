// src/context/SettingsContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [scale, setScale] = useState(1);
  const [contrast, setContrast] = useState(1);

  // Carga inicial desde localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('settings'));
    if (stored) {
      setDarkMode(stored.darkMode);
      setScale(stored.scale);
      setContrast(stored.contrast);
    }
  }, []);

  // Aplica tema, escala y contraste a <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.style.fontSize = `${16 * scale}px`;
    document.documentElement.style.filter = `contrast(${contrast})`;
    localStorage.setItem('settings', JSON.stringify({ darkMode, scale, contrast }));
  }, [darkMode, scale, contrast]);

  return (
    <SettingsContext.Provider
      value={{ darkMode, setDarkMode, scale, setScale, contrast, setContrast }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
