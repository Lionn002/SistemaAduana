// src/pages/funcionario/RegistroMenores.jsx
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { differenceInYears, intervalToDuration, subYears } from 'date-fns';
import { format as formatRut, clean, validate as validateRut } from 'rut.js';

export default function RegistroMenores() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const [minor, setMinor] = useState({ nombre: '', rut: '' });
  const [fechaNac, setFechaNac] = useState(null);
  const [viajaCon, setViajaCon] = useState('ambos');
  const [padres, setPadres] = useState({
    rutPadre: '',
    telPadre: '',
    rutMadre: '',
    telMadre: ''
  });
  const [files, setFiles] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const edad = fechaNac ? differenceInYears(new Date(), fechaNac) : null;
  const esMenor = edad !== null && edad < 18;
  const earliestDate = subYears(new Date(), 18);

  const inputClass = `
    w-full border rounded px-3 py-2
    text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700
    border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-secondary
  `;

  const handleFile = (e, key) => {
    setFiles(f => ({ ...f, [key]: e.target.files[0] }));
    setErrors(err => ({ ...err, [key]: '' }));
  };

  const handleRutChange = (e, key, setter) => {
    let raw = clean(e.target.value).toUpperCase().replace(/[^0-9K]/g, '');
    if (raw.endsWith('K') && (raw.match(/\d/g) || []).length < 7) {
      raw = raw.slice(0, -1);
    }
    raw = raw.slice(0, 9);
    const formatted = formatRut(raw) || raw;
    setter(prev => ({ ...prev, [key]: formatted }));
    setErrors(err => ({ ...err, [key]: '' }));
  };

  const handleField = (e, setter) => {
    setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(err => ({ ...err, [e.target.name]: '' }));
  };

  const validateAll = () => {
    const errs = {};
    if (!minor.nombre.trim()) {
      errs.nombre = 'Nombre completo del menor es obligatorio.';
    }
    if (!minor.rut || !validateRut(minor.rut)) {
      errs.rut = 'RUT del menor inválido.';
    }
    if (!fechaNac) {
      errs.fechaNac = 'Fecha de nacimiento es obligatoria.';
    }
    if (esMenor) {
      ['rutPadre','telPadre','rutMadre','telMadre'].forEach(f => {
        if (!padres[f]?.trim()) {
          errs[f] = 'Este campo es obligatorio.';
        }
      });
    }
    // autorizaciones
    if (esMenor && (viajaCon === 'solo' || viajaCon === 'tutor') && !files.tutor) {
      errs.tutor = 'Adjunte autorización notarial del tutor.';
    }
    if (esMenor && viajaCon === 'unpadre' && !files.judicial) {
      errs.judicial = 'Adjunte autorización judicial.';
    }
    if (esMenor && viajaCon === 'adoptado' && !files.adoptivo) {
      errs.adoptivo = 'Adjunte autorización notarial padre ausente.';
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
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
        Registro de Menores
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos del menor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nombre completo
            </label>
            <input
              name="nombre"
              value={minor.nombre}
              onChange={e => handleField(e, setMinor)}
              className={inputClass}
            />
            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              RUT
            </label>
            <input
              name="rut"
              value={minor.rut}
              onChange={e => handleRutChange(e, 'rut', setMinor)}
              className={inputClass}
            />
            {errors.rut && <p className="text-red-500 text-sm">{errors.rut}</p>}
          </div>
        </div>

        {/* Fecha de nacimiento */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fecha de Nacimiento
          </label>
          <DatePicker
            selected={fechaNac}
            onChange={date => setFechaNac(date)}
            maxDate={new Date()}
            minDate={earliestDate}
            dateFormat="dd-MM-yyyy"
            placeholderText="DD-MM-AAAA"
            className={inputClass}
            wrapperClassName="w-full"
          />
          {errors.fechaNac && <p className="text-red-500 text-sm">{errors.fechaNac}</p>}
          {edad !== null && (
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
              Edad: {edad} años
            </p>
          )}
        </div>

        {/* Datos de los padres */}
        {esMenor && (
          <>
            <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              Datos de los Padres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['Padre','Madre'].map((m) => (
                <React.Fragment key={m}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      RUT {m}
                    </label>
                    <input
                      name={`rut${m}`}
                      value={padres[`rut${m}`]}
                      onChange={e => handleRutChange(e, `rut${m}`, setPadres)}
                      className={inputClass}
                    />
                    {errors[`rut${m}`] && <p className="text-red-500 text-sm">{errors[`rut${m}`]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Teléfono {m}
                    </label>
                    <input
                      name={`tel${m}`}
                      value={padres[`tel${m}`]}
                      onChange={e => handleField(e, setPadres)}
                      className={inputClass}
                      type="tel"
                    />
                    {errors[`tel${m}`] && <p className="text-red-500 text-sm">{errors[`tel${m}`]}</p>}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </>
        )}

        {/* Selección de acompañantes */}
        {esMenor && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              ¿Viaja con?
            </label>
            <select
              value={viajaCon}
              onChange={e => setViajaCon(e.target.value)}
              className={inputClass}
            >
              <option value="ambos">Ambos padres</option>
              <option value="unpadre">Un sólo padre</option>
              <option value="tutor">Tutor legal</option>
              <option value="solo">Viaja solo</option>
              <option value="adoptado">Menor adoptado</option>
            </select>
          </div>
        )}

        {/* Autorizaciones */}
        {esMenor && (viajaCon === 'solo' || viajaCon === 'tutor') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Autorización Notarial del Tutor (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => handleFile(e, 'tutor')}
              className="mt-1"
            />
            {errors.tutor && <p className="text-red-500 text-sm">{errors.tutor}</p>}
          </div>
        )}
        {esMenor && viajaCon === 'unpadre' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Autorización Judicial (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => handleFile(e, 'judicial')}
              className="mt-1"
            />
            {errors.judicial && <p className="text-red-500 text-sm">{errors.judicial}</p>}
          </div>
        )}
        {esMenor && viajaCon === 'adoptado' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Autorización Notarial Padre Ausente (PDF)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={e => handleFile(e, 'adoptivo')}
              className="mt-1"
            />
            {errors.adoptivo && <p className="text-red-500 text-sm">{errors.adoptivo}</p>}
          </div>
        )}

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
