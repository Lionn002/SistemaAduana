// src/pages/funcionario/RegistroMenores.jsx
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import { intervalToDuration, subYears } from 'date-fns';
import PhoneInput from 'react-phone-input-2';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-input-2/lib/style.css';
import { format as formatRut, clean, validate as validateRut } from 'rut.js';

registerLocale('es', es);

export default function RegistroMenores() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const [minor, setMinor] = useState({ nombre: '', rut: '' });
  const [fechaNac, setFechaNac] = useState(null);
  const [viajaCon, setViajaCon] = useState('ambos');
  const [padres, setPadres] = useState({
    nombrePadre: '', rutPadre: '', phonePadre: '',
    nombreMadre: '', rutMadre: '', phoneMadre: ''
  });
  const [emergency, setEmergency] = useState({ titular: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const ageDuration = fechaNac
    ? intervalToDuration({ start: fechaNac, end: new Date() })
    : null;
  const esMenor = ageDuration && ageDuration.years < 18;
  const earliestDate = subYears(new Date(), 18);

  const inputClass = `
    w-full border rounded px-3 py-2
    text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
    border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary
  `;

  const phoneCommon = {
    countryCodeEditable: false,
    enableSearch: true,
    containerClass: 'w-full',
    inputClass: isDark
      ? 'w-full bg-gray-700 text-gray-100 border-gray-600'
      : 'w-full bg-white text-gray-900 border-gray-300',
    buttonClass: isDark
      ? 'bg-gray-700 border-gray-600'
      : 'bg-white border-gray-300',
    dropdownClass: isDark
      ? 'bg-gray-700 text-gray-100'
      : 'bg-white text-gray-900',
    inputProps: {
      maxLength: 9,
      onKeyPress: e => { if (!/[0-9]/.test(e.key)) e.preventDefault(); },
      placeholder: '9xxxxxxx'
    }
  };

  const handleRutChange = (e, key, setter) => {
    let raw = clean(e.target.value).toUpperCase().replace(/[^0-9K]/g, '');
    if (raw.endsWith('K') && (raw.match(/\d/g) || []).length < 7) raw = raw.slice(0, -1);
    raw = raw.slice(0, 9);
    const formatted = formatRut(raw) || raw;
    setter(prev => ({ ...prev, [key]: formatted }));
    setErrors(err => ({ ...err, [key]: '' }));
  };

  const handleMinorField = e => {
    setMinor(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const handlePadreField = e => {
    setPadres(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const handleEmergencyField = e => {
    setEmergency(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const validateAll = () => {
    const errs = {};
    if (!minor.nombre.trim()) errs.nombre = 'Ingrese el nombre completo del menor.';
    if (!minor.rut || !validateRut(minor.rut)) errs.rut = 'RUT inválido.';
    if (!fechaNac) errs.fechaNac = 'Seleccione fecha de nacimiento.';
    if (!emergency.titular.trim()) errs.emergencyTitular = 'Ingrese nombre del contacto de emergencia.';
    if (!emergency.phone.trim()) errs.emergencyPhone = 'Ingrese teléfono de emergencia.';
    if (esMenor) {
      ['nombrePadre','rutPadre','phonePadre','nombreMadre','rutMadre','phoneMadre']
        .forEach(field => {
          if (!padres[field]?.trim()) errs[field] = 'Este campo es obligatorio.';
        });
    }
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validateAll();
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSuccess('Registro de menor completado con éxito.');
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-100">Registro de Menor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre menor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre completo del menor
          </label>
          <input
            name="nombre"
            value={minor.nombre}
            onChange={handleMinorField}
            className={inputClass}
            placeholder="Ej: Juan Pérez"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
        </div>

        {/* RUT menor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            RUT del menor
          </label>
          <input
            name="rut"
            value={minor.rut}
            onChange={e => handleRutChange(e, 'rut', setMinor)}
            className={inputClass}
            placeholder="12.345.678-K"
          />
          {errors.rut && <p className="text-red-500 text-sm">{errors.rut}</p>}
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fecha de nacimiento del menor
          </label>
          <DatePicker
            selected={fechaNac}
            onChange={date => { setFechaNac(date); setErrors(err => ({ ...err, fechaNac: '' })); }}
            locale="es"
            dateFormat="dd-MM-yyyy"
            maxDate={new Date()}
            minDate={earliestDate}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={18}
            placeholderText="DD-MM-AAAA"
            className={inputClass}
            wrapperClassName="w-full"
          />
          {errors.fechaNac && <p className="text-red-500 text-sm">{errors.fechaNac}</p>}
          {ageDuration && (
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
              Edad: {ageDuration.years} años, {ageDuration.months} meses, {ageDuration.days} días
            </p>
          )}
        </div>

        {/* Datos de padres/tutores */}
        {esMenor && (
          <>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Datos de padres/tutores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Padre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre completo del padre
                </label>
                <input
                  name="nombrePadre"
                  value={padres.nombrePadre}
                  onChange={handlePadreField}
                  className={inputClass}
                  placeholder="Ej: Carlos Pérez"
                />
                {errors.nombrePadre && <p className="text-red-500 text-sm">{errors.nombrePadre}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  RUT del padre
                </label>
                <input
                  name="rutPadre"
                  value={padres.rutPadre}
                  onChange={e => handleRutChange(e, 'rutPadre', setPadres)}
                  className={inputClass}
                  placeholder="12.345.678-5"
                />
                {errors.rutPadre && <p className="text-red-500 text-sm">{errors.rutPadre}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Teléfono del padre (+56)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-l">
                    +56
                  </span>
                  <input
                    name="phonePadre"
                    value={padres.phonePadre}
                    onChange={e => {
                      if (/^[0-9]*$/.test(e.target.value)) handlePadreField(e);
                    }}
                    maxLength={9}
                    className="flex-1 border border-l-0 rounded-r px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none"
                    placeholder="9xxxxxxx"
                  />
                </div>
                {errors.phonePadre && <p className="text-red-500 text-sm">{errors.phonePadre}</p>}
              </div>

              {/* Madre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nombre completo de la madre
                </label>
                <input
                  name="nombreMadre"
                  value={padres.nombreMadre}
                  onChange={handlePadreField}
                  className={inputClass}
                  placeholder="Ej: María González"
                />
                {errors.nombreMadre && <p className="text-red-500 text-sm">{errors.nombreMadre}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  RUT de la madre
                </label>
                <input
                  name="rutMadre"
                  value={padres.rutMadre}
                  onChange={e => handleRutChange(e, 'rutMadre', setPadres)}
                  className={inputClass}
                  placeholder="12.345.678-2"
                />
                {errors.rutMadre && <p className="text-red-500 text-sm">{errors.rutMadre}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Teléfono de la madre (+56)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-l">
                    +56
                  </span>
                  <input
                    name="phoneMadre"
                    value={padres.phoneMadre}
                    onChange={e => {
                      if (/^[0-9]*$/.test(e.target.value)) handlePadreField(e);
                    }}
                    maxLength={9}
                    className="flex-1 border border-l-0 rounded-r px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none"
                    placeholder="9xxxxxxx"
                  />
                </div>
                {errors.phoneMadre && <p className="text-red-500 text-sm">{errors.phoneMadre}</p>}
              </div>
            </div>
          </>
        )}

        {/* Teléfono de emergencia */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre contacto de emergencia
          </label>
          <input
            name="titular"
            value={emergency.titular}
            onChange={handleEmergencyField}
            className={inputClass}
            placeholder="Ej: Tía Ana"
          />
          {errors.emergencyTitular && <p className="text-red-500 text-sm">{errors.emergencyTitular}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Teléfono de emergencia (+56)
          </label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-l">
              +56
            </span>
            <input
              name="phone"
              value={emergency.phone}
              onChange={e => {
                if (/^[0-9]*$/.test(e.target.value)) handleEmergencyField(e);
              }}
              maxLength={9}
              className="flex-1 border border-l-0 rounded-r px-3 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none"
              placeholder="9xxxxxxx"
            />
          </div>
          {errors.emergencyPhone && <p className="text-red-500 text-sm">{errors.emergencyPhone}</p>}
        </div>

        {/* Enviar */}
        <button
          type="submit"
          className="w-full bg-secondary dark:bg-secondary/80 text-white py-3 rounded-lg hover:bg-secondary/90 transition"
        >
          Registrar Menor
        </button>
        {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
      </form>
    </div>
  );
}
