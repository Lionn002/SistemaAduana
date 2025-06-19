// src/pages/declaraciones/HistorialDeclaraciones.jsx
import React, { useEffect, useState } from 'react';
import historialData from '../../data/historial';
import { format as formatRut } from 'rut.js';

export default function HistorialDeclaraciones() {
  const [resultados, setResultados] = useState([]);
  const [busquedaRut, setBusquedaRut] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(usuario);

    if (usuario?.role === 'usuario') {
      const coincidencias = historialData.filter(f => f.rut === usuario.rut);
      setResultados(coincidencias);
    }
  }, []);

  const handleBuscar = () => {
    if (!busquedaRut.trim()) return;
    const coincidencias = historialData.filter(f => f.rut === busquedaRut.trim());
    setResultados(coincidencias);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value;
    const formatted = formatRut(raw);
    setBusquedaRut(formatted);
  };

  const handleInputBlur = () => {
    if (busquedaRut) {
      setBusquedaRut(formatRut(busquedaRut));
    }
  };

  const handleDescargar = (declaracion) => {
    alert(`Descargando PDF para: ${declaracion.tipo} de ${declaracion.nombre}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Historial de Declaraciones
      </h2>

      {user && (user.role === 'PDI' || user.role === 'SAG') && (
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-200 mb-2 font-semibold">
            Buscar por RUT:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="11.111.111-1"
              value={busquedaRut}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="flex-1 px-4 py-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
            <button
              onClick={handleBuscar}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Buscar
            </button>
          </div>
        </div>
      )}

      {resultados.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No se encontraron declaraciones.</p>
      ) : (
        <ul className="space-y-4">
          {resultados.map((item, index) => (
            <li key={index} className="border p-4 rounded bg-gray-50 dark:bg-gray-700 dark:text-white">
              <p><strong>Tipo:</strong> {item.tipo}</p>
              <p><strong>Nombre:</strong> {item.nombre}</p>
              <p><strong>Fecha:</strong> {item.fecha}</p>
              <p><strong>Estado:</strong> {item.estado}</p>

              <div className="mt-2 space-x-2">
                <button
                  onClick={() => alert(`Vista previa: ${item.tipo} de ${item.nombre}`)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                >
                  Ver Detalles
                </button>
                <button
                  onClick={() => handleDescargar(item)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Descargar PDF
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
