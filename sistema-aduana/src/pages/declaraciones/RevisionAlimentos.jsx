// src/pages/declaraciones/RevisionAlimentos.jsx
import React, { useState } from 'react';

// Simulación de declaraciones pendientes
const formulariosIniciales = [
  {
    id: 1,
    nombre: 'Carlos Manríquez',
    rut: '13.544.670-8',
    correo: 'carlosMan@gmail.com',
    alimentos: 'Frutos secos, carne envasada',
    estado: 'en proceso'
  },
  {
    id: 2,
    nombre: 'Laura Gómez',
    rut: '15.123.456-7',
    correo: 'lauragomez@example.com',
    alimentos: 'Quesos artesanales, frutas',
    estado: 'en proceso'
  }
];

export default function RevisionAlimentos() {
  const [formularios, setFormularios] = useState(formulariosIniciales);

  const cambiarEstado = (id, nuevoEstado) => {
    const actualizado = formularios.map(f =>
      f.id === id ? { ...f, estado: nuevoEstado } : f
    );
    setFormularios(actualizado);
    alert(`Formulario ${id} actualizado a estado "${nuevoEstado}". Se notificará al usuario.`);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Revisión de Declaraciones de Alimentos</h2>

      {formularios.filter(f => f.estado === 'en proceso').length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No hay formularios pendientes.</p>
      ) : (
        <ul className="space-y-6">
          {formularios.map(f => (
            <li
              key={f.id}
              className="border rounded p-4 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            >
              <p><strong>Nombre:</strong> {f.nombre}</p>
              <p><strong>RUT:</strong> {f.rut}</p>
              <p><strong>Correo:</strong> {f.correo}</p>
              <p><strong>Alimentos:</strong> {f.alimentos}</p>
              <p><strong>Estado actual:</strong> {f.estado}</p>

              {f.estado === 'en proceso' && (
                <div className="mt-4 space-x-2">
                  <button
                    onClick={() => cambiarEstado(f.id, 'aceptado')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Aceptar
                  </button>
                  <button
                    onClick={() => cambiarEstado(f.id, 'rechazado')}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
