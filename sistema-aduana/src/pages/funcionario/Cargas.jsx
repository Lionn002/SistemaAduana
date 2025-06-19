// src/pages/funcionario/Cargas.jsx
import React from 'react';
import { Truck, PackageCheck } from 'lucide-react';

export default function Cargas() {
  const cargasSimuladas = [
    { id: 'CARGA-001', transportista: 'Juan López', origen: 'Argentina', destino: 'Chile', estado: 'En revisión' },
    { id: 'CARGA-002', transportista: 'María Pérez', origen: 'Brasil', destino: 'Chile', estado: 'Aprobada' },
    { id: 'CARGA-003', transportista: 'Carlos Díaz', origen: 'Bolivia', destino: 'Chile', estado: 'Rechazada' }
  ];

  const getColor = (estado) => {
    switch (estado) {
      case 'Aprobada': return 'bg-green-600';
      case 'Rechazada': return 'bg-red-600';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="flex items-center gap-3 mb-6 text-primary dark:text-white">
        <Truck className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Gestión de Cargas</h2>
      </div>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Visualización decorativa de cargas recientes para fiscalización. Este contenido es solo una simulación de ejemplo.
      </p>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
          <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Transportista</th>
              <th className="px-4 py-2 text-left">Origen</th>
              <th className="px-4 py-2 text-left">Destino</th>
              <th className="px-4 py-2 text-left">Estado</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            {cargasSimuladas.map((carga, i) => (
              <tr key={i} className="border-b dark:border-gray-700">
                <td className="px-4 py-2">{carga.id}</td>
                <td className="px-4 py-2">{carga.transportista}</td>
                <td className="px-4 py-2">{carga.origen}</td>
                <td className="px-4 py-2">{carga.destino}</td>
                <td className="px-4 py-2">
                  <span className={`text-white px-3 py-1 rounded text-sm ${getColor(carga.estado)}`}>
                    {carga.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
