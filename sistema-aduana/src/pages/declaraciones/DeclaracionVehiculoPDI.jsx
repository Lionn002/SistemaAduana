import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format as formatRut, clean } from 'rut.js';

export default function DeclaracionVehiculoPDI() {
  const [form, setForm] = useState({
    nombre: '', rut: '', correo: '', patente: '', marca: '', modelo: '', año: '', fechaInicio: null, fechaFin: null
  });
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
      if (valor === '' || valor === null) nuevosErrores[campo] = 'Este campo es obligatorio.';
    });
    setErrors(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;
    console.log("Formulario de vehículo enviado:", { ...form, estado: "en proceso" });
    setEnviado(true);
    setForm({ nombre: '', rut: '', correo: '', patente: '', marca: '', modelo: '', año: '', fechaInicio: null, fechaFin: null });
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Declaración de Vehículo - PDI
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['nombre', 'rut', 'correo'].map((name, idx) => (
            <div key={idx}>
              <input
                name={name}
                placeholder={name === 'correo' ? 'Correo electrónico' : name === 'rut' ? 'RUT' : 'Nombre completo'}
                value={form[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['patente', 'marca', 'modelo', 'año'].map((name, idx) => (
            <div key={idx}>
              <input
                name={name}
                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                value={form[name]}
                type={name === 'año' ? 'number' : 'text'}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              />
              {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha inicio permiso</label>
            <DatePicker
              selected={form.fechaInicio}
              onChange={date => setForm(prev => ({ ...prev, fechaInicio: date }))}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/AAAA"
            />
            {errors.fechaInicio && <p className="text-red-500 text-sm mt-1">{errors.fechaInicio}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha fin permiso</label>
            <DatePicker
              selected={form.fechaFin}
              onChange={date => setForm(prev => ({ ...prev, fechaFin: date }))}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
              dateFormat="dd/MM/yyyy"
              placeholderText="DD/MM/AAAA"
            />
            {errors.fechaFin && <p className="text-red-500 text-sm mt-1">{errors.fechaFin}</p>}
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
