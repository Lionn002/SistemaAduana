import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import logo from '../assets/logo_aduanas_chile.png';

const navItems = [
  { to: '', label: 'Inicio' },
  { to: 'consulta-estado', label: 'Consultar estado de trámites' },
  { to: 'nueva-declaracion', label: 'Nueva declaración/documentación' },
  { to: 'alertas', label: 'Alertas' },
  { to: 'formulario-jurada', label: 'Formulario de declaración jurada' },
  { to: 'validacion-vehiculo', label: 'Registro y Validación de Vehículo' },
  { to: 'mas-tramites', label: 'Más trámites' },
];

export default function UserLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-24 p-4">
          <img src={logo} alt="Logo Aduanas" className="w-56 h-auto" />
        </div>
        <nav className="flex-1 overflow-y-auto">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to === '' ? '/usuario' : `/usuario/${to}`}
              end={to === ''}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <NavLink
            to="/usuario/ajustes"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm rounded ${
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <FiSettings className="mr-2" />
            Ajustes
          </NavLink>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded transition"
          >
            <FiLogOut className="mr-2" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow p-4">
          <h1 className="text-xl font-semibold text-primary dark:text-secondary">
            Panel de Usuario
          </h1>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        <footer className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-center py-3 border-t border-gray-200 dark:border-gray-700 text-sm">
          © 2025 Servicio Nacional de Aduanas. Todos los derechos reservados.
        </footer>
      </div>
    </div>
);
}
