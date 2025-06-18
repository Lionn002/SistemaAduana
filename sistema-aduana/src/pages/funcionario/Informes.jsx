// src/pages/funcionario/Informes.jsx
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';

// Registrar locale español para react-datepicker
registerLocale('es', es);

const tipoInformeOptions = [
  { value: 'mensual', label: 'Mensual' },
  { value: 'anual',  label: 'Anual' },
  { value: 'custom', label: 'Personalizado' }
];

export default function Informes() {
  const [tipo, setTipo]       = useState(null);
  const [desde, setDesde]     = useState(new Date());
  const [hasta, setHasta]     = useState(new Date());
  const [params, setParams]   = useState(null);
  const [msg, setMsg]         = useState('');
  const [isDark, setIsDark]   = useState(false);

  // Detectar modo oscuro
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Estilos react-select adaptados a claro/oscuro
  const styles = {
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
    })
  };

  const formatDate = date => {
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const handleGenerar = () => {
    if (!tipo) {
      setMsg('Seleccione tipo de informe');
      return;
    }
    setParams({ tipo, desde, hasta });
    setMsg('');
  };
  const handlePDF = () => {
    if (!params) return setMsg('Primero genera el informe.');
    setMsg('Informe exportado como PDF');
  };
  const handleExcel = () => {
    if (!params) return setMsg('Primero genera el informe.');
    setMsg('Informe exportado como Excel');
  };

  const today = new Date();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Módulo de Informes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Tipo de Informe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de Informe
          </label>
          <Select
            options={tipoInformeOptions}
            value={tipo}
            onChange={opt => { setTipo(opt); setMsg(''); }}
            placeholder="Selecciona tipo..."
            styles={styles}
            className="mt-1"
          />
        </div>

        {/* Desde */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Desde
          </label>
          <DatePicker
            selected={desde}
            onChange={date => { setDesde(date); setMsg(''); }}
            locale="es"
            dateFormat="dd/MM/yyyy"
            maxDate={today}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          />
        </div>

        {/* Hasta */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Hasta
          </label>
          <DatePicker
            selected={hasta}
            onChange={date => { setHasta(date); setMsg(''); }}
            locale="es"
            dateFormat="dd/MM/yyyy"
            minDate={desde}
            maxDate={today}
            className="mt-1 w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={handleGenerar}
          className="bg-secondary dark:bg-secondary/80 text-white px-4 py-2 rounded hover:bg-secondary/90 transition"
        >
          Generar Informe
        </button>
        <button
          onClick={handlePDF}
          className="bg-red-500 dark:bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Exportar PDF
        </button>
        <button
          onClick={handleExcel}
          className="bg-green-500 dark:bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Exportar Excel
        </button>
      </div>

      {msg && (
        <p className="text-center text-gray-800 dark:text-gray-100 mb-4">
          {msg}
        </p>
      )}

      {params && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-gray-700 dark:text-gray-100">
          <h3 className="font-medium mb-2">Parámetros Seleccionados:</h3>
          <p><strong>Tipo:</strong> {params.tipo.label}</p>
          <p><strong>Desde:</strong> {formatDate(params.desde)}</p>
          <p><strong>Hasta:</strong> {formatDate(params.hasta)}</p>
        </div>
      )}
    </div>
  );
}
