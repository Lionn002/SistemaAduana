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

  // Cargar inspecciones desde localStorage o defaults
  const loadAll = () => {
    const stored = JSON.parse(localStorage.getItem('inspecciones') || 'null');
    if (stored) return stored;
    const defaults = [
      { id: 1, fecha: '2025-06-15T09:30', lugar: 'Paso Los Libertadores', estado: 'Pendiente', resultado: 'Aceptado', descripcion: 'Revisión completa de equipaje y documentos.', persona: { nombre: 'María José González Martínez', rut: '11111111-1' }, ultimaActualizacion: null, borrador: true },
      { id: 2, fecha: '2025-06-16T14:20', lugar: 'Puerto de San Antonio', estado: 'Completada', resultado: 'Aceptado', descripcion: 'Inspección de carga refrigerada: verificada temperatura, sellos y documentación sanitaria.', persona: { nombre: 'Fernanda Alejandra Ramírez Soto', rut: '33333333-3' }, ultimaActualizacion: '2025-06-16T15:00', borrador: false }
    ];
    localStorage.setItem('inspecciones', JSON.stringify(defaults));
    return defaults;
  };

  useEffect(() => {
    const all = loadAll();
    const data = all.find(item => item.id === Number(id));
    setInspeccion(data);
    setForm({ ...data });
  }, [id]);

  if (!inspeccion) return <p>Inspección no encontrada.</p>;

  const handleChange = (field, value) => setForm(f => ({ ...f, [field]: value }));

  const handleSave = () => {
    const updated = {
      ...form,
      ultimaActualizacion: new Date().toISOString().slice(0,16),
      borrador: accion === 'borrador'
    };
    // Persistir en localStorage
    const all = loadAll().map(item => item.id === updated.id ? updated : item);
    localStorage.setItem('inspecciones', JSON.stringify(all));
    setShowModal(false);
    navigate('/funcionario/inspecciones');
  };

  const openModal = (tipo) => {
    setAccion(tipo);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Inspección #{inspeccion.id}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Fecha y hora</label>
          <input type="datetime-local" value={form.fecha} disabled className="mt-1 w-full border rounded px-2 py-1 bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Lugar</label>
          <input value={form.lugar} disabled className="mt-1 w-full border rounded px-2 py-1 bg-gray-100" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Persona inspeccionada</label>
          <input value={`${form.persona.nombre} (${form.persona.rut})`} disabled className="mt-1 w-full border rounded px-2 py-1 bg-gray-100" />
        </div>
        <div>
          <label className="block font-semibold">Estado</label>
          <select value={form.estado} onChange={e => handleChange('estado', e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
            {estados.map(e => <option key={e}>{e}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-semibold">Resultado</label>
        <select value={form.resultado} onChange={e => handleChange('resultado', e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
          {resultados.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Descripción</label>
        <textarea value={form.descripcion} onChange={e => handleChange('descripcion', e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
      </div>

      <div className="flex gap-4">
        <button onClick={() => openModal('borrador')} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
          Guardar borrador
        </button>
        <button onClick={() => openModal('enviar')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Enviar
        </button>
      </div>

      {form.borrador && form.ultimaActualizacion && (
        <p className="text-sm text-gray-500">
          Borrador guardado: {new Date(form.ultimaActualizacion).toLocaleString()}
        </p>
      )}

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h3 className="text-lg font-semibold mb-4">
            ¿Seguro que quieres salir de la inspección {inspeccion.id}?
          </h3>
          <div className="flex justify-end gap-4">
            <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded border">
              Volver
            </button>
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded">
              Continuar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}