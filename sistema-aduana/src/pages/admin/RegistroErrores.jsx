// src/pages/admin/RegistroErrores.jsx
import React from 'react';
import logs from '../../data/logs';

export default function RegistroErrores() {
  return (
    <div className="max-w-full w-full px-4 py-6">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          🛠 Registro de Errores del Sistema
        </h2>

        {logs.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No hay errores registrados por el momento 🎉
          </p>
        ) : (
          <div className="overflow-x-auto max-w-full">
            <table className="min-w-[800px] w-full table-auto text-sm text-left border-collapse rounded overflow-hidden">
              <thead>
                <tr className="bg-secondary text-white">
                  <th className="px-4 py-3">🗓 Fecha y Hora</th>
                  <th className="px-4 py-3">📁 Módulo</th>
                  <th className="px-4 py-3">👤 Usuario</th>
                  <th className="px-4 py-3">⚠️ Tipo</th>
                  <th className="px-4 py-3">📝 Descripción</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={log.id}
                    className={`border-b dark:border-gray-700 ${
                      i % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
                    } text-gray-800 dark:text-gray-100`}
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{log.fecha}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{log.modulo}</td>
                    <td className="px-4 py-2 whitespace-nowrap">{log.usuario}</td>
                    <td className="px-4 py-2 font-semibold text-red-600 dark:text-red-400">
                      {log.tipo}
                    </td>
                    <td className="px-4 py-2">{log.mensaje}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
