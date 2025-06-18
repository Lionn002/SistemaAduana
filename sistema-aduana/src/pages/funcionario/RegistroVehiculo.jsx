// src/pages/funcionario/RegistroVehiculo.jsx
import React, { useState } from 'react';
import Select from 'react-select';
import { vehicles } from '../../data/vehiculos';
import { validate as validateRut, format as formatRut } from 'rut.js';

// Regex de patentes
const autoRegex = /^(?:[A-Z]{4}\d{2}|[A-Z]{2}\d{4})$/;
const motoRegex = /^(?:[A-Z]{2}\d{3}|[A-Z]{3}\d{2})$/;

// Opciones de categoría
const tipoVehOptions = [
  { value: 'auto', label: 'Automóvil' },
  { value: 'moto', label: 'Motocicleta' }
];

// Tema oscuro para react-select
const darkSelectStyles = {
  control: (base) => ({
    ...base,
    background: '#1f2937',         // bg-gray-800
    borderColor: '#4b5563',        // border-gray-600
    color: '#f9fafb'               // text-gray-100
  }),
  menu: (base) => ({
    ...base,
    background: '#1f2937'
  }),
  singleValue: (base) => ({
    ...base,
    color: '#f9fafb'
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    background: isFocused
      ? '#374151'                  // bg-gray-700
      : isSelected
        ? '#4b5563'                // bg-gray-600
        : 'transparent',
    color: '#f9fafb'
  }),
  placeholder: (base) => ({
    ...base,
    color: '#9ca3af'              // placeholder-gray-400
  })
};

export default function RegistroVehiculo() {
  const [tipoVeh, setTipoVeh] = useState(null);
  const [patente, setPatente] = useState('');
  const [marca, setMarca] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [anio, setAnio] = useState(null);
  const [rutConductor, setRutConductor] = useState('');
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const filtered = tipoVeh
    ? vehicles.filter(v => v.categoria === tipoVeh.value)
    : [];

  const makes = Array.from(new Set(filtered.map(v => v.marca)))
    .sort()
    .map(m => ({ value: m, label: m }));
  const types = marca
    ? Array.from(new Set(
        filtered.filter(v => v.marca === marca.value).map(v => v.tipo)
      ))
        .sort()
        .map(t => ({ value: t, label: t }))
    : [];
  const models = marca && tipo
    ? Array.from(new Set(
        filtered
          .filter(v => v.marca === marca.value && v.tipo === tipo.value)
          .map(v => v.modelo)
      ))
        .sort()
        .map(m => ({ value: m, label: m }))
    : [];
  const years = marca && tipo && modelo
    ? (() => {
        const list = filtered.filter(v =>
          v.marca === marca.value &&
          v.tipo === tipo.value &&
          v.modelo === modelo.value
        );
        const min = Math.min(...list.map(v => v.añoMin));
        const max = Math.max(...list.map(v => v.añoMax));
        const arr = [];
        for (let y = max; y >= min; y--) {
          arr.push({ value: y, label: String(y) });
        }
        return arr;
      })()
    : [];

  const handleTipoVehChange = opt => {
    setTipoVeh(opt);
    setPatente('');
    setMarca(null);
    setTipo(null);
    setModelo(null);
    setAnio(null);
    setErrors({});
    setSuccessMsg('');
  };
  const handleMarcaChange = opt => {
    setMarca(opt);
    setTipo(null);
    setModelo(null);
    setAnio(null);
    setErrors(prev => ({ ...prev, marca: '' }));
    setSuccessMsg('');
  };
  const handleTipoChange = opt => {
    setTipo(opt);
    setModelo(null);
    setAnio(null);
    setErrors(prev => ({ ...prev, tipo: '' }));
    setSuccessMsg('');
  };
  const handleModeloChange = opt => {
    setModelo(opt);
    setAnio(null);
    setErrors(prev => ({ ...prev, modelo: '' }));
    setSuccessMsg('');
  };

  const handlePatenteChange = e => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const maxLen = tipoVeh?.value === 'moto' ? 5 : tipoVeh?.value === 'auto' ? 6 : Infinity;
    if (val.length > maxLen) val = val.slice(0, maxLen);
    setPatente(val);

    let err = '';
    if (val && /^[0-9]/.test(val)) err = 'Debe comenzar con una letra';
    else if (tipoVeh?.value === 'auto' && val.length >= 6 && !autoRegex.test(val))
      err = 'Formato inválido. Ej: ABCD12 o AB1234';
    else if (tipoVeh?.value === 'moto' && val.length >= 5 && !motoRegex.test(val))
      err = 'Formato inválido. Ej: AB123 o ABC12';
    setErrors(prev => ({ ...prev, patente: err }));
    setSuccessMsg('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!tipoVeh) errs.tipoVeh = 'Seleccione categoría';
    if (!patente) errs.patente = 'La patente es obligatoria';
    else if (
      /^[0-9]/.test(patente) ||
      (tipoVeh.value === 'auto' && !autoRegex.test(patente)) ||
      (tipoVeh.value === 'moto' && !motoRegex.test(patente))
    ) {
      errs.patente = tipoVeh.value === 'auto'
        ? 'Ej: ABCD12 o AB1234'
        : 'Ej: AB123 o ABC12';
    }
    if (!marca) errs.marca = 'Seleccione marca';
    if (!tipo) errs.tipo = 'Seleccione tipo';
    if (!modelo) errs.modelo = 'Seleccione modelo';
    if (!anio) errs.anio = 'Seleccione año';
    if (!rutConductor.trim()) errs.rut = 'El RUT es obligatorio';
    else if (!validateRut(rutConductor)) errs.rut = 'RUT inválido';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSuccessMsg('Vehículo registrado exitosamente!');
    setTipoVeh(null);
    setPatente('');
    setMarca(null);
    setTipo(null);
    setModelo(null);
    setAnio(null);
    setRutConductor('');
    setErrors({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Registrar Vehículo
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Categoría
          </label>
          <Select
            options={tipoVehOptions}
            value={tipoVeh}
            onChange={handleTipoVehChange}
            placeholder="Automóvil o Motocicleta"
            styles={darkSelectStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#374151',
                primary: '#4b5563',
                neutral0: '#1f2937',
                neutral80: '#f9fafb'
              }
            })}
          />
          {errors.tipoVeh && <p className="text-red-500 text-sm">{errors.tipoVeh}</p>}
        </div>

        {/* Patente */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Patente
          </label>
          <input
            type="text"
            value={patente}
            onChange={handlePatenteChange}
            placeholder={tipoVeh?.value === 'moto' ? 'AB123 o ABC12' : 'AB1234 o ABCD12'}
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500"
            disabled={!tipoVeh}
          />
          {errors.patente && <p className="text-red-500 text-sm">{errors.patente}</p>}
        </div>

        {/* Marca */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Marca
          </label>
          <Select
            options={makes}
            value={marca}
            onChange={handleMarcaChange}
            placeholder="Selecciona marca..."
            styles={darkSelectStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#374151',
                primary: '#4b5563',
                neutral0: '#1f2937',
                neutral80: '#f9fafb'
              }
            })}
            isDisabled={!tipoVeh}
          />
          {errors.marca && <p className="text-red-500 text-sm">{errors.marca}</p>}
        </div>

        {/* Tipo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo
          </label>
          <Select
            options={types}
            value={tipo}
            onChange={handleTipoChange}
            placeholder="Selecciona tipo..."
            styles={darkSelectStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#374151',
                primary: '#4b5563',
                neutral0: '#1f2937',
                neutral80: '#f9fafb'
              }
            })}
            isDisabled={!marca}
          />
          {errors.tipo && <p className="text-red-500 text-sm">{errors.tipo}</p>}
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Modelo
          </label>
          <Select
            options={models}
            value={modelo}
            onChange={handleModeloChange}
            placeholder="Selecciona modelo..."
            styles={darkSelectStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#374151',
                primary: '#4b5563',
                neutral0: '#1f2937',
                neutral80: '#f9fafb'
              }
            })}
            isDisabled={!tipo}
          />
          {errors.modelo && <p className="text-red-500 text-sm">{errors.modelo}</p>}
        </div>

        {/* Año */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Año
          </label>
          <Select
            options={years}
            value={anio}
            onChange={opt => setAnio(opt)}
            placeholder="Selecciona año..."
            styles={darkSelectStyles}
            theme={theme => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary25: '#374151',
                primary: '#4b5563',
                neutral0: '#1f2937',
                neutral80: '#f9fafb'
              }
            })}
            isDisabled={!modelo}
          />
          {errors.anio && <p className="text-red-500 text-sm">{errors.anio}</p>}
        </div>

        {/* RUT */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            RUT del Conductor
          </label>
          <input
            type="text"
            value={rutConductor}
            onChange={e => setRutConductor(formatRut(e.target.value))}
            placeholder="12.345.678-9"
            className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 placeholder-gray-400 dark:placeholder-gray-500"
          />
          {errors.rut && <p className="text-red-500 text-sm">{errors.rut}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded hover:bg-secondary/90 transition"
        >
          Registrar Vehículo
        </button>
        {successMsg && (
          <p className="text-green-400 dark:text-green-300 text-center mt-2">{successMsg}</p>
        )}
      </form>
    </div>
  );
}
