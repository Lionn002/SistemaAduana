import React, { useState } from 'react';
import { format as formatRut, clean } from 'rut.js';

export default function DeclaracionAlimentos() {
  const [form, setForm] = useState({ nombre: '', rut: '', correo: '', alimentos: '' });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    const isRut = name === 'rut';
    const cleaned = clean(value);
    if (isRut && cleaned.length > 9) return;
    const formatted = isRut ? formatRut(value) : value;
    setForm(prev => ({ ...prev, [name]: formatted }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const nuevosErrores = {};
    Object.entries(form).forEach(([campo, valor]) => {
      if (!valor.trim()) nuevosErrores[campo] = 'Este campo es obligatorio.';
    });
    setErrors(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    console.log("Formulario enviado:", { ...form, estado: "en proceso" });
    setEnviado(true);
    setForm({ nombre: '', rut: '', correo: '', alimentos: '' });
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Declaración de Alimentos - SAG</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {['nombre', 'rut', 'correo', 'alimentos'].map((campo) => (
          <div key={campo}>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 capitalize">
              {campo === 'correo' ? 'Correo electrónico' : campo === 'rut' ? 'RUT' : campo}
            </label>
            {campo !== 'alimentos' ? (
              <input
                type={campo === 'correo' ? 'email' : 'text'}
                name={campo}
                value={form[campo]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <textarea
                name="alimentos"
                value={form.alimentos}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />
            )}
            {errors[campo] && <p className="text-red-500 text-sm mt-1">{errors[campo]}</p>}
          </div>
        ))}
        <button type="submit" className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary/90">
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