// src/pages/declaraciones/HistorialDeclaraciones.jsx
import React, { useEffect, useState } from 'react';
import historialData from '../../data/historial';

export default function HistorialDeclaraciones() {
  const [resultados, setResultados] = useState([]);
  const [userRut, setUserRut] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    if (user?.rut) {
      setUserRut(user.rut);
      const coincidencias = historialData.filter(f => f.rut === user.rut);
      setResultados(coincidencias);
    }
  }, []);

  const handleDescargar = (declaracion) => {
    // Simulación de descarga
    alert(`Descargando PDF para: ${declaracion.tipo} de ${declaracion.nombre}`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Historial de Declaraciones
      </h2>

      {resultados.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No tienes declaraciones registradas.</p>
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
