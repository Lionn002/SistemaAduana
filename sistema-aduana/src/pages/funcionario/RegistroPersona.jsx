// src/pages/funcionario/RegistroPersona.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { validate, format } from 'rut.js';

// Opciones de tipo de movimiento
const movementOptions = [
  { value: 'ingreso', label: 'Ingreso' },
  { value: 'egreso', label: 'Egreso' }
];

export default function RegistroPersona() {
  const [tipoMov, setTipoMov] = useState(null);
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [nacionalidad, setNacionalidad] = useState(null);
  const [pasaporte, setPasaporte] = useState('');
  const [ingresaConVeh, setVeh] = useState(false);
  const [patente, setPatente] = useState('');
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccess] = useState('');
  const [isDark, setIsDark] = useState(false);

  // Lista de países para react-select
  const [countryOptions] = useState(countryList().getData());

  // Detectar tema
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Estilos para react-select adaptados a tema
  const selectStyles = {
    control: base => ({
      ...base,
      background: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      boxShadow: 'none'
    }),
    menu: base => ({
      ...base,
      background: isDark ? '#1f2937' : '#ffffff'
    }),
    singleValue: base => ({
      ...base,
      color: isDark ? '#f9fafb' : '#1f2937'
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? (isDark ? '#374151' : '#e5e7eb')
        : isFocused
          ? (isDark ? '#374151' : '#f3f4f6')
          : 'transparent',
      color: isDark ? '#f9fafb' : '#1f2937'
    }),
    placeholder: base => ({
      ...base,
      color: isDark ? '#9ca3af' : '#6b7280'
    }),
    input: base => ({
      ...base,
      color: isDark ? '#f9fafb' : '#1f2937'
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  // Restringir input de RUT
  const handleRutKeyDown = e => {
    const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab'];
    if (allowed.includes(e.key)) return;
    const { value, selectionStart } = e.target;
    if (/[0-9]/.test(e.key)) return;
    if (/^[kK]$/.test(e.key) && (value.match(/\d/g) || []).length >= 7 && selectionStart === value.length) return;
    e.preventDefault();
  };

  const handleRutChange = e => {
    setRut(e.target.value);
    setErrors(prev => ({ ...prev, rut: '' }));
    if (successMsg) setSuccess('');
  };
  const handleRutBlur = () => {
    if (rut) {
      const formatted = format(rut);
      setRut(formatted);
      setErrors(prev => ({ ...prev, rut: validate(formatted) ? '' : 'Formato de RUT inválido' }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!tipoMov) errs.tipoMov = 'Seleccione ingreso o egreso';
    if (!rut.trim()) errs.rut = 'El RUT es obligatorio';
    else if (!validate(rut)) errs.rut = 'Formato de RUT inválido';
    if (!nombre.trim()) errs.nombre = 'Nombre es obligatorio';
    if (!nacionalidad) errs.nacionalidad = 'Nacionalidad es obligatoria';
    if (tipoMov?.value === 'egreso' && !pasaporte.trim()) errs.pasaporte = 'Debe indicar número de pasaporte';
    if (ingresaConVeh && !patente.trim()) errs.patente = 'Ingrese la patente';

    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSuccess('Persona registrada correctamente!');
    setTipoMov(null);
    setRut('');
    setNombre('');
    setNacionalidad(null);
    setPasaporte('');
    setVeh(false);
    setPatente('');
    setErrors({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Registro de Personas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <Select
          options={movementOptions}
          value={tipoMov}
          onChange={opt => { setTipoMov(opt); setErrors(prev => ({ ...prev, tipoMov: '' })); setSuccess(''); }}
          placeholder="Ingreso o Egreso"
          styles={selectStyles}
          menuPortalTarget={document.body}
          menuPosition="absolute"
        />
        {errors.tipoMov && <p className="text-red-500 text-sm mt-1">{errors.tipoMov}</p>}

        <input
          type="text"
          placeholder="Ingrese RUT"
          value={rut}
          onKeyDown={handleRutKeyDown}
          onChange={handleRutChange}
          onBlur={handleRutBlur}
          className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
        />
        {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}

        <input
          type="text"
          value={nombre}
          onChange={e => { setNombre(e.target.value); setErrors(prev => ({ ...prev, nombre: '' })); setSuccess(''); }}
          placeholder="Nombre completo"
          className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
        />
        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}

        <Select
          options={countryOptions}
          value={nacionalidad}
          onChange={opt => { setNacionalidad(opt); setErrors(prev => ({ ...prev, nacionalidad: '' })); setSuccess(''); }}
          placeholder="Selecciona nacionalidad..."
          styles={selectStyles}
          menuPortalTarget={document.body}
          menuPosition="absolute"
          isSearchable
        />
        {errors.nacionalidad && <p className="text-red-500 text-sm mt-1">{errors.nacionalidad}</p>}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={ingresaConVeh}
            onChange={e => { setVeh(e.target.checked); setSuccess(''); }}
            id="veh-check"
            className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"
          />
          <label htmlFor="veh-check" className="text-gray-700 dark:text-gray-300">Ingresa con vehículo</label>
        </div>

        {ingresaConVeh && (
          <input
            type="text"
            value={patente}
            onChange={e => { setPatente(e.target.value.toUpperCase()); setErrors(prev => ({ ...prev, patente: '' })); setSuccess(''); }}
            placeholder="Patente del vehículo"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          />
        )}
        {errors.patente && <p className="text-red-500 text-sm mt-1">{errors.patente}</p>}

        {tipoMov?.value === 'egreso' && (
          <input
            type="text"
            value={pasaporte}
            onChange={e => { setPasaporte(e.target.value); setErrors(prev => ({ ...prev, pasaporte: '' })); setSuccess(''); }}
            placeholder="Nº de pasaporte"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          />
        )}
        {errors.pasaporte && <p className="text-red-500 text-sm mt-1">{errors.pasaporte}</p>}

        <button type="submit" className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded hover:bg-secondary/90 transition">Registrar Persona</button>

        {successMsg && <p className="text-green-400 dark:text-green-300 text-center mt-2">{successMsg}</p>}
      </form>
    </div>
  );
}
