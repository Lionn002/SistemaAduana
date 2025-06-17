import React, { useState, useEffect } from 'react';

export default function Certificaciones() {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    setCerts([
      { id: 'C-001', organismo: 'SAG', fecha: '2025-06-10' },
      { id: 'C-002', organismo: 'SAG', fecha: '2025-06-12' }
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Certificaciones</h2>
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Organismo</th>
            <th className="px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {certs.map(c => (
            <tr key={c.id} className="border-t dark:border-gray-700">
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.organismo}</td>
              <td className="px-4 py-2">{c.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}