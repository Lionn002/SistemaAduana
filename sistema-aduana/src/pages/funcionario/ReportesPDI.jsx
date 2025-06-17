import React, { useState, useEffect } from 'react';

const tipos = ['Incidente', 'Robo', 'Control Documental'];

export default function ReportesPDI() {
  const [reportes, setReportes] = useState([]);
  const [tipoFilter, setTipoFilter] = useState('Todos');

  useEffect(() => {
    setReportes([
      { id: 'R-101', tipo: 'Incidente', fecha: '2025-06-14', descripcion: 'Accidente menor en pasarela' },
      { id: 'R-102', tipo: 'Robo', fecha: '2025-06-15', descripcion: 'Hurto de equipaje en terminal' }
    ]);
  }, []);

  const filtered = tipoFilter === 'Todos'
    ? reportes
    : reportes.filter(r => r.tipo === tipoFilter);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reportes PDI</h2>
      <div className="flex items-center mb-4 gap-4">
        <label className="font-medium">Filtrar por tipo:</label>
        <select
          value={tipoFilter}
          onChange={e => setTipoFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option>Todos</option>
          {tipos.map((t, i) => <option key={i}>{t}</option>)}
        </select>
      </div>
      <ul className="space-y-4">
        {filtered.map(r => (
          <li key={r.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow hover:bg-gray-50 dark:hover:bg-gray-700">
            <p><span className="font-medium">ID:</span> {r.id}</p>
            <p><span className="font-medium">Tipo:</span> {r.tipo}</p>
            <p><span className="font-medium">Fecha:</span> {r.fecha}</p>
            <p className="mt-2"><span className="font-medium">Descripción:</span> {r.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
