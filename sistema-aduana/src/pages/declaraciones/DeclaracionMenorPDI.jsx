// src/pages/declaraciones/DeclaracionMenorPDI.jsx
import React, { useState } from 'react';

export default function DeclaracionMenorPDI() {
  const [form, setForm] = useState({
    nombreMenor: '',
    rutMenor: '',
    nombreTutor: '',
    rutTutor: '',
    parentesco: '',
    telefono: '',
    correo: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const campos = Object.values(form);
    if (campos.some(c => c.trim() === '')) {
      return alert('Por favor completa todos los campos.');
    }

    // Simulación de guardado
    console.log('Formulario menor enviado:', { ...form, estado: 'en proceso' });
    setEnviado(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Declaración de Menor - PDI
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Menor */}
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white">Datos del Menor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <input
              name="nombreMenor"
              placeholder="Nombre completo del menor"
              value={form.nombreMenor}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              name="rutMenor"
              placeholder="RUT del menor"
              value={form.rutMenor}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Tutor */}
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white">Datos del Tutor Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <input
              name="nombreTutor"
              placeholder="Nombre completo del tutor"
              value={form.nombreTutor}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              name="rutTutor"
              placeholder="RUT del tutor"
              value={form.rutTutor}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              name="parentesco"
              placeholder="Parentesco (Ej: Tío materno)"
              value={form.parentesco}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <input
              name="telefono"
              placeholder="Teléfono (+56 9 ...)"
              value={form.telefono}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              type="tel"
            />
            <input
              name="correo"
              type="email"
              placeholder="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
              className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white col-span-2"
            />
          </div>
        </div>

        {/* Enviar */}
        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary/90"
        >
          Enviar declaración
        </button>

        {enviado && (
          <p className="text-green-500 text-center mt-4">
            Declaración enviada correctamente. Estado: <strong>en proceso</strong>
          </p>
        )}
      </form>
    </div>
  );
}
