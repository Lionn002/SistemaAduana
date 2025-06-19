import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormularioJurada() {
  const isDark = document.documentElement.classList.contains('dark');
  const navigate = useNavigate();

  return (
    <div className="p-6 text-base lg:text-lg">
      <h2 className="text-3xl font-bold mb-4 text-primary">Formulario de Declaración Jurada</h2>
      <p className={`mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
        Completa este formulario obligatorio para declarar productos, alimentos o equipaje.
      </p>

      <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
        <p><strong>Importante:</strong> Este formulario debe completarse antes de cruzar la frontera.</p>
        <ul className="mt-2 list-disc list-inside space-y-1">
          <li>Debes declarar cualquier alimento, bebida o planta.</li>
          <li>Declaraciones falsas pueden ser sancionadas.</li>
          <li>Adjunta documentación si corresponde.</li>
        </ul>
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
