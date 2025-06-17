import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import logo from '../../assets/logo_aduanas_chile.png';

const navItems = [
  { to: '', label: 'Inicio' },
  { to: 'consulta-estado', label: 'Consultar estado de trámites' },
  { to: 'nueva-declaracion', label: 'Nueva declaración/documentación' },
  { to: 'alertas', label: 'Alertas' },
  { to: 'formulario-jurada', label: 'Formulario de declaración jurada' },
  { to: 'validacion-vehiculo', label: 'Registro y Validación de Vehículo' },
  { to: 'mas-tramites', label: 'Más trámites' },
];

const UserLayout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [textSize, setTextSize] = useState('base'); 
  const [showSettings, setShowSettings] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 flex flex-col border-r border-gray-200 dark:border-gray-700">
        {/* Logo */}
        <div className="flex items-center justify-center h-28 p-4">
          {/* Agranda el logo: className="w-48" o "w-56" */}
          <img src={logo} alt="Logo Aduanas" className="w-48 h-auto" />
        </div>
        {/* Navegación */}
        <nav className="flex-1 overflow-y-auto hide-scrollbar">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to === '' ? '/usuario' : `/usuario/${to}`}
              end={to === ''}
              className={({ isActive }) =>
                `block px-4 py-3 text-sm 
                 ${isActive 
                   ? 'bg-primary text-white' 
                   : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        {/* Ajustes */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowSettings(prev => !prev)}
            className="flex items-center w-full text-gray-600 dark:text-gray-300 hover:text-secondary transition"
          >
            <FiSettings className="mr-2" /> Ajustes
          </button>
          {showSettings && (
            <div className="mt-2 space-y-3 text-xs">
              <div>
                <span className="block mb-1">Tema:</span>
                <button
                  onClick={() => setDarkMode(prev => !prev)}
                  className="px-2 py-1 bg-secondary text-white rounded hover:bg-secondary/90 transition"
                >
                  {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
                </button>
              </div>
              <div>
                <span className="block mb-1">Tamaño de texto:</span>
                <select
                  value={textSize}
                  onChange={e => setTextSize(e.target.value)}
                  className="w-full rounded border px-2 py-1 bg-white dark:bg-gray-700"
                >
                  <option value="base">Normal</option>
                  <option value="lg">Mediano</option>
                  <option value="xl">Grande</option>
                </select>
              </div>
            </div>
          )}
        </div>
        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition"
          >
            <FiLogOut className="mr-2" /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className={`flex-1 flex flex-col bg-accent dark:bg-gray-900 text-${textSize}`}>
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow p-4">
          <h1 className="text-xl font-semibold text-primary dark:text-secondary">
            Panel de Usuario
          </h1>
        </header>
        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="bg-primary dark:bg-gray-800 text-white text-center py-3 text-sm">
          © 2025 Servicio Nacional de Aduanas. Todos los derechos reservados.
        </footer>
      </div>
    </div>
  );
};

export default UserLayout;
