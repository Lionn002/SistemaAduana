// src/pages/funcionario/InspeccionDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

const estados = ['Pendiente', 'En Progreso', 'Completada'];
const resultados = ['Aceptado', 'Rechazado'];

export default function InspeccionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inspeccion, setInspeccion] = useState(null);
  const [form, setForm] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [accion, setAccion] = useState(null);

  const loadAll = () =>
    JSON.parse(localStorage.getItem('inspecciones') || '[]');

  useEffect(() => {
    const all = loadAll();
    const data = all.find(item => item.id === Number(id));
    if (data) {
      setInspeccion(data);
      setForm(data);
    }
  }, [id]);

  if (!inspeccion) {
    return (
      <p className="text-gray-800 dark:text-gray-200">
        Inspección no encontrada.
      </p>
    );
  }

  const handleChange = (field, value) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const updated = {
      ...form,
      ultimaActualizacion: new Date().toISOString().slice(0, 16),
      borrador: accion === 'borrador'
    };
    const all = loadAll().map(item =>
      item.id === updated.id ? updated : item
    );
    localStorage.setItem('inspecciones', JSON.stringify(all));
    setShowModal(false);
    navigate('/funcionario/inspecciones');
  };

  const openModal = tipo => {
    setAccion(tipo);
    setShowModal(true);
  };

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold mb-6">
          Inspección #{inspeccion.id}
        </h2>

        {/* Fecha & Lugar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-semibold mb-2">Fecha y hora</label>
            <input
              type="datetime-local"
              value={form.fecha}
              disabled
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Lugar</label>
            <input
              value={form.lugar}
              disabled
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
        </div>

        {/* Persona & Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-semibold mb-2">
              Persona inspeccionada
            </label>
            <input
              value={`${form.persona.nombre} (${form.persona.rut})`}
              disabled
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Estado</label>
            <select
              value={form.estado}
              onChange={e => handleChange('estado', e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
            >
              {estados.map(e => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resultado */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Resultado</label>
          <select
            value={form.resultado}
            onChange={e => handleChange('resultado', e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600"
          >
            {resultados.map(r => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Descripción */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={e => handleChange('descripcion', e.target.value)}
            className="w-full h-32 px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-200 rounded border border-gray-300 dark:border-gray-600 resize-none"
          />
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            onClick={() => openModal('borrador')}
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Guardar borrador
          </button>
          <button
            onClick={() => openModal('enviar')}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Enviar
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            Inspección #{inspeccion.id}
          </h3>
          {accion === 'borrador' ? (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              ¿Estás seguro que quieres salir? Todos los cambios realizados
              quedarán guardados en borrador.
            </p>
          ) : (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              ¿Estás seguro de querer enviar la inspección? Se notificará al
              usuario sobre los cambios.
            </p>
          )}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Volver
            </button>
            <button
              onClick={handleSave}
              className={`px-4 py-2 rounded focus:outline-none focus:ring-2 ${
                accion === 'borrador'
                  ? 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500 text-white'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white'
              }`}
            >
              {accion === 'borrador' ? 'Continuar' : 'Enviar'}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
