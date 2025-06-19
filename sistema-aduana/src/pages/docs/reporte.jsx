// src/pages/docs/reporte.jsx
import React from 'react';
import { FileWarning, MessageCircleWarning, Send } from 'lucide-react';

export default function Reporte() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="mb-6 flex items-center gap-3 text-primary dark:text-white">
        <FileWarning className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Reporte de Fronteras</h2>
      </div>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Esta sección entrega un resumen visual de incidentes, alertas y actividades inusuales registradas en los últimos días por los distintos organismos de frontera.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
            <MessageCircleWarning className="w-5 h-5" /> Alertas de Seguridad
          </h3>
          <ul className="list-disc list-inside text-red-800 dark:text-red-300">
            <li>Ingreso de vehículo con antecedentes pendientes</li>
            <li>Declaración inconsistente de alimentos (sector 2)</li>
            <li>Pasajero con documentación adulterada</li>
          </ul>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
            <Send className="w-5 h-5" /> Comunicaciones Oficiales
          </h3>
          <ul className="list-disc list-inside text-blue-800 dark:text-blue-300">
            <li>Notificación de cambio de turno</li>
            <li>Reunión de coordinación 09:00h</li>
            <li>Actualización de protocolo COVID-19</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 bg-gray-100 dark:bg-gray-700 p-4 rounded shadow text-gray-700 dark:text-gray-200">
        <h3 className="text-lg font-semibold mb-2">Estadísticas Semanales</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Alimentos retenidos:</strong> 54</li>
          <li><strong>Vehículos observados:</strong> 12</li>
          <li><strong>Reportes ingresados:</strong> 8</li>
          <li><strong>Pasajeros observados:</strong> 21</li>
        </ul>
      </div>
    </div>
  );
}
