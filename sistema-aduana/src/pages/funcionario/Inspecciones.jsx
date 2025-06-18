// src/pages/funcionario/Inspecciones.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const estados = ['Todos', 'Pendiente', 'En Progreso', 'Completada'];

export default function Inspecciones() {
  const location = useLocation();
  const [inspecciones, setInspecciones] = useState([]);
  const [filter, setFilter] = useState('Todos');

  // Carga inicial desde localStorage o defaults
  const loadAll = () => {
    const stored = JSON.parse(localStorage.getItem('inspecciones') || 'null');
    if (stored) return stored;
    const defaults = [
      {
        id: 1,
        fecha: '2025-06-15T09:30',
        lugar: 'Paso Los Libertadores',
        estado: 'Pendiente',
        descripcion: 'Revisión completa de equipaje y documentación.',
        persona: {
          nombre: 'María José González Martínez',
          rut: '11111111-1'
        },
        ultimaActualizacion: null,
        borrador: true
      },
      {
        id: 2,
        fecha: '2025-06-16T14:20',
        lugar: 'Puerto de San Antonio',
        estado: 'Completada',
        descripcion: 'Inspección de carga refrigerada: verificada temperatura.',
        persona: {
          nombre: 'Fernanda Alejandra Ramírez Soto',
          rut: '33333333-3'
        },
        ultimaActualizacion: '2025-06-16T15:00',
        borrador: false
      }
    ];
    localStorage.setItem('inspecciones', JSON.stringify(defaults));
    return defaults;
  };

  useEffect(() => {
    setInspecciones(loadAll());
  }, []);

  const filtered =
    filter === 'Todos'
      ? inspecciones
      : inspecciones.filter(ins => ins.estado === filter);

  // Ajusta fecha restando 4h y formatea 24h
  const formatDateTime = iso => {
    const d = new Date(iso.replace('T', ' '));
    d.setHours(d.getHours() - 4);
    return d.toLocaleString('es-CL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-4 dark:text-gray-100">
        Inspecciones PDI
      </h2>

      {/* Filtro */}
      <div className="mb-4 flex items-center gap-2 dark:text-gray-200">
        <label className="font-medium">Filtrar por estado:</label>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded"
        >
          {estados.map((e, i) => (
            <option key={i} value={e} className="bg-white dark:bg-gray-700">
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Lista */}
      <ul className="space-y-2">
        {filtered.map(ins => (
          <NavLink
            key={ins.id}
            to={`${location.pathname}/${ins.id}`}
            className="block"
          >
            <li className="bg-white dark:bg-gray-800 rounded shadow p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-medium dark:text-gray-100">#{ins.id}</span>{' '}
                  – <span className="dark:text-gray-200">{ins.lugar}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {ins.borrador && ins.ultimaActualizacion && (
                    <span className="px-2 py-0.5 bg-yellow-500 text-white rounded">
                      Borrador
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded text-white ${
                      ins.estado === 'Pendiente'
                        ? 'bg-yellow-500'
                        : ins.estado === 'En Progreso'
                        ? 'bg-blue-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {ins.estado}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {ins.descripcion}
              </p>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {ins.ultimaActualizacion
                  ? `Última actualización: ${formatDateTime(ins.ultimaActualizacion)}`
                  : `Fecha: ${formatDateTime(ins.fecha)}`}
              </div>
            </li>
          </NavLink>
        ))}
        {filtered.length === 0 && (
          <li className="text-center text-gray-500 dark:text-gray-400">
            No hay inspecciones.
          </li>
        )}
      </ul>
    </div>
  );
}
