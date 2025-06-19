import React from 'react';

export default function AdminDashboard() {
  // Placeholder data; replace with real values or props
  const stats = [
    { title: 'Usuarios Registrados', value: 1280 },
    { title: 'Envíos Pendientes', value: 42 },
    { title: 'Envíos Aprobados', value: 314 },
    { title: 'Reportes Nuevos', value: 7 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 flex flex-col justify-between"
          >
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {stat.title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
