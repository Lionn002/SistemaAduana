// src/pages/declaraciones/DeclaracionVehiculoPDI.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DeclaracionVehiculoPDI() {
  const [form, setForm] = useState({
    nombre: '',
    rut: '',
    correo: '',
    patente: '',
    marca: '',
    modelo: '',
    anio: '',
    fechaInicio: null,
    fechaFin: null
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const campos = Object.values(form);
    if (campos.some(c => c === '' || c === null)) {
      return alert("Por favor completa todos los campos.");
    }

    console.log("Formulario de vehículo enviado:", { ...form, estado: "en proceso" });
    setEnviado(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        Declaración de Vehículo - PDI
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Datos personales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            name="rut"
            placeholder="RUT"
            value={form.rut}
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            name="correo"
            type="email"
            placeholder="Correo electrónico"
            value={form.correo}
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Datos del vehículo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="patente"
            placeholder="Patente"
            value={form.patente}
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            name="marca"
            placeholder="Marca"
            value={form.marca}
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            name="modelo"
            placeholder="Modelo"
            value={form.modelo}
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            name="anio"
            placeholder="Año"
            value={form.anio}
            type="number"
            onChange={handleChange}
            className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Fechas */}
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
          </div>
        </div>

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
