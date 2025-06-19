// src/pages/docs/protocolo.jsx
import React from 'react';
import { FileText, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function Protocolo() {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="mb-6 flex items-center gap-3 text-primary dark:text-white">
        <FileText className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Protocolo de Operaciones</h2>
      </div>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Este documento establece las directrices y procedimientos estándar que deben seguir todos los funcionarios en el ejercicio de sus funciones en frontera.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">1. Ingreso de Vehículos</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Revisión documental y física del vehículo</li>
            <li>Validación de declaración previa</li>
            <li>Registro fotográfico</li>
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">2. Escaneo de Cédula</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Verificación automática del QR</li>
            <li>Identificación del ciudadano</li>
            <li>Registro de ingreso/egreso</li>
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">3. Revisión de Alimentos</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Aplica tanto a SAG como a PDI</li>
            <li>Control de especies prohibidas</li>
            <li>Formulario obligatorio</li>
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2 dark:text-white">4. Alertas de Riesgo</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            <li>Detección por perfilamiento</li>
            <li>Escalamiento automático a superior</li>
            <li>Notificación al sistema</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex items-center gap-2 text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-800 p-4 rounded">
        <AlertTriangle className="w-6 h-6" />
        <span>
          Este protocolo es de cumplimiento obligatorio para todo el personal. Cualquier incumplimiento puede ser informado a través del módulo de reportes.
        </span>
      </div>
    </div>
  );
}
