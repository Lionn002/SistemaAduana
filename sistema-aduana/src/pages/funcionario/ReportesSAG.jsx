import React, { useState, useEffect } from 'react';

export default function ReportesSAG() {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    setReportes([
      { id: 'S-201', item: 'Alimentos', cantidad: 50 },
      { id: 'S-202', item: 'Pesticidas', cantidad: 20 }
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reportes SAG</h2>
      <ul className="space-y-2">
        {reportes.map(r => (
          <li key={r.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
            <p><span className="font-medium">ID:</span> {r.id}</p>
            <p><span className="font-medium">Item:</span> {r.item}</p>
            <p><span className="font-medium">Cantidad:</span> {r.cantidad}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}