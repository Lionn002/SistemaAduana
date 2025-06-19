// src/pages/docs/manual.jsx
import React from 'react';
import { BookOpen, Users, Cog } from 'lucide-react';

export default function Manual() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="mb-6 flex items-center gap-3 text-primary dark:text-white">
        <BookOpen className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Manual de Coordinación</h2>
      </div>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Este manual tiene como objetivo establecer los roles y mecanismos de coordinación entre los distintos organismos en frontera: PDI, SAG y Aduana.
      </p>

      <div className="space-y-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5" /> Roles Institucionales
          </h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li><strong>PDI:</strong> Control de identidad, revisión de menores, fiscalización general.</li>
            <li><strong>SAG:</strong> Revisión y validación de ingreso de alimentos y productos agrícolas.</li>
            <li><strong>Aduana:</strong> Control de cargas, vehículos, y validación de documentación.</li>
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white flex items-center gap-2">
            <Cog className="w-5 h-5" /> Coordinación Operativa
          </h3>
          <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>Reunión diaria entre los jefes de cada entidad.</li>
            <li>Canal de comunicación activo (interno web/app).</li>
            <li>Informe de incidencias compartido al final de cada jornada.</li>
          </ol>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Turnos y Responsables</h3>
          <table className="w-full text-sm text-left text-gray-800 dark:text-white">
            <thead className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white">
              <tr>
                <th className="px-4 py-2">Turno</th>
                <th className="px-4 py-2">Responsable</th>
                <th className="px-4 py-2">Entidad</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800">
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-2">Mañana</td>
                <td className="px-4 py-2">Juan Soto</td>
                <td className="px-4 py-2">PDI</td>
              </tr>
              <tr className="border-b dark:border-gray-700">
                <td className="px-4 py-2">Tarde</td>
                <td className="px-4 py-2">María León</td>
                <td className="px-4 py-2">SAG</td>
              </tr>
              <tr>
                <td className="px-4 py-2">Noche</td>
                <td className="px-4 py-2">Carlos Rivas</td>
                <td className="px-4 py-2">Aduana</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
