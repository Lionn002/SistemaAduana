// src/pages/declaraciones/DeclaracionAlimentos.jsx
import React, { useState } from 'react';

export default function DeclaracionAlimentos() {
  const [form, setForm] = useState({
    nombre: '',
    rut: '',
    correo: '',
    alimentos: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.nombre || !form.rut || !form.correo || !form.alimentos) return alert("Por favor completa todos los campos.");

    // Simular guardado con estado "en proceso"
    console.log("Formulario enviado:", { ...form, estado: "en proceso" });
    setEnviado(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Declaración de Alimentos - SAG</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">RUT</label>
          <input
            type="text"
            name="rut"
            value={form.rut}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Correo Electrónico</label>
          <input
            type="email"
            name="correo"
            value={form.correo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-300">Alimentos declarados</label>
          <textarea
            name="alimentos"
            value={form.alimentos}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Ej: frutos secos, carne envasada..."
          />
        </div>

        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary/90"
        >
          Enviar declaración
        </button>

        {enviado && (
          <p className="text-green-500 text-center mt-4">
            Formulario enviado correctamente. Estado: <strong>en proceso</strong>
          </p>
        )}
      </form>
    </div>
  );
}
