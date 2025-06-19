// src/pages/funcionario/Seguimiento.jsx
import React from 'react';
import { Search, MapPin, ArrowRight, Clock } from 'lucide-react';

export default function Seguimiento() {
  const seguimientos = [
    {
      id: 'TRAMITE-1321',
      tipo: 'Vehículo',
      origen: 'Paso Los Libertadores',
      destino: 'Santiago',
      estado: 'En tránsito',
      hora: '08:23 AM'
    },
    {
      id: 'TRAMITE-1322',
      tipo: 'Pasajero',
      origen: 'Frontera Arica',
      destino: 'Antofagasta',
      estado: 'Llegado',
      hora: '06:15 AM'
    },
    {
      id: 'TRAMITE-1323',
      tipo: 'Carga',
      origen: 'Paso Pino Hachado',
      destino: 'Temuco',
      estado: 'Pendiente',
      hora: 'Aún no sale'
    }
  ];

  const estadoColor = (estado) => {
    switch (estado) {
      case 'En tránsito': return 'bg-yellow-500';
      case 'Llegado': return 'bg-green-600';
      case 'Pendiente': return 'bg-gray-500';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="flex items-center gap-3 mb-6 text-primary dark:text-white">
        <Search className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Seguimiento de Trámites</h2>
      </div>

      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Estado visual de trámites registrados en la última jornada. Esta vista es representativa para mostrar estados de avance.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {seguimientos.map((item, idx) => (
          <div key={idx} className="p-4 rounded shadow bg-gray-100 dark:bg-gray-700">
            <div className="flex items-center gap-2 mb-2 text-gray-800 dark:text-white">
              <MapPin className="w-5 h-5" />
              <h3 className="font-semibold">{item.tipo} — {item.id}</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>Desde:</strong> {item.origen}
              <ArrowRight className="inline-block mx-1 w-4 h-4" />
              <strong>Hasta:</strong> {item.destino}
            </p>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-300 flex items-center gap-1">
              <Clock className="w-4 h-4" /> {item.hora}
            </p>
            <div className={`mt-3 inline-block text-white text-sm px-3 py-1 rounded ${estadoColor(item.estado)}`}>
              {item.estado}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
