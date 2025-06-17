// src/components/FuncionarioDashboard.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FuncionarioDashboard() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = state?.user || JSON.parse(localStorage.getItem('user') || 'null');

  // Secciones específicas por rol
  const sectionsByRole = {
    PDI: [
      { label: 'Inspecciones', to: 'inspecciones' },
      { label: 'Reportes PDI', to: 'reportes-pdi' }
    ],
    SAG: [
      { label: 'Certificaciones', to: 'certificaciones' },
      { label: 'Reportes SAG', to: 'reportes-sag' }
    ],
    ADUANA: [
      { label: 'Gestión de Cargas', to: 'cargas' },
      { label: 'Seguimiento', to: 'seguimiento' }
    ]
  };
  const sections = sectionsByRole[user.role] || [];

  // Documentos compartidos
  const commonDocs = [
    { name: 'Protocolo de Operaciones', to: 'docs/protocolo' },
    { name: 'Manual de Coordinación', to: 'docs/manual' },
    { name: 'Reporte de Fronteras', to: 'docs/reporte' }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Encabezado */}
      <header className="mb-8 bg-gradient-to-r from-secondary to-primary text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold">Dashboard Funcionario</h1>
        <p className="mt-2">
          Bienvenido, <span className="font-bold">{user.name}</span> —{' '}
          <span className="italic">{user.role}</span>
        </p>
      </header>

      {/* Acciones de rol */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-secondary">
          Acciones de {user.role}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              onClick={() => navigate(sec.to, { state: { user } })}
              className="cursor-pointer bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                {sec.label}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Ir a {sec.label.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Documentos Compartidos */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-secondary">
          Documentos Compartidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonDocs.map((doc, idx) => (
            <div
              key={idx}
              onClick={() => navigate(doc.to, { state: { user } })}
              className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {doc.name}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Ver documento
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
