// src/pages/admin/RegistroErrores.jsx
import React from 'react';
import logs from '../../data/logs';

export default function RegistroErrores() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Registro de Errores del Sistema
      </h2>

      {logs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay errores registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Módulo</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Tipo</th>
                <th className="px-4 py-2">Mensaje</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
                >
                  <td className="px-4 py-2">{log.fecha}</td>
                  <td className="px-4 py-2">{log.modulo}</td>
                  <td className="px-4 py-2">{log.usuario}</td>
                  <td className="px-4 py-2">
                    <span className="text-red-600 dark:text-red-400 font-semibold">{log.tipo}</span>
                  </td>
                  <td className="px-4 py-2">{log.mensaje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
