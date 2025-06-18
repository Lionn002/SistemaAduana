// src/pages/funcionario/RegistroUsuario.jsx
import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// Opciones de rol de usuario
const roleOptions = [
  { value: 'PDI', label: 'PDI' },
  { value: 'SAG', label: 'SAG' },
  { value: 'ADUANA', label: 'ADUANA' },
  { value: 'USER', label: 'Usuario' }
];

export default function RegistroUsuario() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [role, setRole] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [isDark, setIsDark] = useState(false);

  // Detectar tema
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // Estilos adaptados a tema
  const selectStyles = {
    control: base => ({
      ...base,
      background: isDark ? '#1f2937' : '#ffffff',
      borderColor: isDark ? '#4b5563' : '#d1d5db',
      boxShadow: 'none'
    }),
    singleValue: base => ({ ...base, color: isDark ? '#f9fafb' : '#1f2937' }),
    menu: base => ({ ...base, background: isDark ? '#1f2937' : '#ffffff' }),
    option: (base, { isSelected, isFocused }) => ({
      ...base,
      backgroundColor: isSelected
        ? (isDark ? '#374151' : '#e5e7eb')
        : isFocused
          ? (isDark ? '#374151' : '#f3f4f6')
          : 'transparent',
      color: isDark ? '#f9fafb' : '#1f2937'
    }),
    placeholder: base => ({ ...base, color: isDark ? '#9ca3af' : '#6b7280' }),
    input: base => ({ ...base, color: isDark ? '#f9fafb' : '#1f2937' }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  const validateEmail = email => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!validateEmail(email)) errs.email = 'Correo inválido';
    if (password.length < 8) errs.password = 'La contraseña debe tener al menos 8 caracteres';
    if (password !== confirmPwd) errs.confirmPwd = 'Las contraseñas no coinciden';
    if (!role) errs.role = 'Seleccione un rol';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Aquí iría la llamada al API para registrar la cuenta
    console.log({ email, password, role: role.value });
    setSuccessMsg('Cuenta creada correctamente');
    setEmail('');
    setPassword('');
    setConfirmPwd('');
    setRole(null);
    setErrors({});
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 role="heading" aria-level="2" className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Registro de Cuentas de Usuario
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            aria-required="true"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="usuario@dominio.com"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {errors.email && <p role="alert" className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            aria-required="true"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="********"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {errors.password && <p role="alert" className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label htmlFor="confirmPwd" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar contraseña
          </label>
          <input
            id="confirmPwd"
            type="password"
            aria-required="true"
            value={confirmPwd}
            onChange={e => setConfirmPwd(e.target.value)}
            placeholder="********"
            className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          {errors.confirmPwd && <p role="alert" className="text-red-500 text-sm mt-1">{errors.confirmPwd}</p>}
        </div>

        {/* Rol */}
        <div>
          <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Rol
          </label>
          <Select
            inputId="role-select"
            options={roleOptions}
            value={role}
            onChange={opt => setRole(opt)}
            placeholder="Seleccione rol..."
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"
            aria-label="Selecciona rol de usuario"
          />
          {errors.role && <p role="alert" className="text-red-500 text-sm mt-1">{errors.role}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded hover:bg-secondary/90 transition focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          Crear Cuenta
        </button>

        {successMsg && (
          <p role="status" className="text-green-400 dark:text-green-300 text-center mt-2">
            {successMsg}
          </p>
        )}
      </form>
    </div>
  );
}
