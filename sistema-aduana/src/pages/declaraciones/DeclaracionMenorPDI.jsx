import React, { useState } from 'react';
import { format as formatRut, clean } from 'rut.js';

export default function DeclaracionMenorPDI() {
  const [form, setForm] = useState({
    nombreMenor: '', rutMenor: '', nombreTutor: '', rutTutor: '', parentesco: '', telefono: '', correo: ''
  });
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    const isRut = name.includes('rut');
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
    console.log('Formulario menor enviado:', { ...form, estado: 'en proceso' });
    setEnviado(true);
    setForm({ nombreMenor: '', rutMenor: '', nombreTutor: '', rutTutor: '', parentesco: '', telefono: '', correo: '' });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Declaración de Menor - PDI</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white">Datos del Menor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {['nombreMenor', 'rutMenor'].map((name) => (
              <div key={name}>
                <input
                  name={name}
                  placeholder={name === 'nombreMenor' ? 'Nombre completo del menor' : 'RUT del menor'}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 dark:text-white">Datos del Tutor Legal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {[
              { name: 'nombreTutor', placeholder: 'Nombre del tutor' },
              { name: 'rutTutor', placeholder: 'RUT del tutor' },
              { name: 'parentesco', placeholder: 'Parentesco' },
              { name: 'telefono', placeholder: 'Teléfono', type: 'tel' },
              { name: 'correo', placeholder: 'Correo electrónico', type: 'email', colSpan: true }
            ].map(({ name, placeholder, type = 'text', colSpan }) => (
              <div key={name} className={colSpan ? 'col-span-2' : ''}>
                <input
                  name={name}
                  placeholder={placeholder}
                  type={type}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                />
                {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary/90">
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