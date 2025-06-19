import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Adjuntos() {
  const isDark = document.documentElement.classList.contains('dark');
  const navigate = useNavigate();

  return (
    <div className="p-6 text-base lg:text-lg">
      <h2 className="text-3xl font-bold mb-4 text-primary">Documentos Adjuntos</h2>
      <p className={`mb-4 ${isDark ? 'text-white' : 'text-black'}`}>Revisa y sube documentos que respalden tus declaraciones o trámites.</p>

      <div className={`p-6 rounded-lg space-y-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
        <p>No tienes documentos cargados aún.</p>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Subir nuevo documento
        </button>
      </div>

      <button
        onClick={() => navigate('/usuario/mas-tramites')}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Volver a Más Trámites
      </button>
    </div>
  );
}
