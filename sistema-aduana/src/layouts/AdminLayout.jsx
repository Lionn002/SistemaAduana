// src/layouts/AdminLayout.jsx
import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Home, UserPlus, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo_aduanas_chile.png';

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1f3a] dark:bg-gray-800 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 flex justify-center">
            <img src={logo} alt="Logo Aduanas" className="w-20 h-20" />
          </div>
          <nav className="px-4 space-y-2">
            <NavLink
              to="/admin"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded ${
                  isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
                }`
              }
            >
              <Home className="w-5 h-5 text-white" />
              Dashboard
            </NavLink>

            <NavLink
              to="/admin/registro-usuario"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded ${
                  isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
                }`
              }
            >
              <UserPlus className="w-5 h-5 text-white" />
              Registro de Usuarios
            </NavLink>
          </nav>
        </div>

        <div className="px-4 pb-6 space-y-2">
          <NavLink
            to="/admin/ajustes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded ${
                isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
              }`
            }
          >
            <Settings className="w-5 h-5 text-white" />
            Ajustes
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 hover:bg-red-600 rounded text-red-100 w-full text-left"
          >
            <LogOut className="w-5 h-5 text-red-100" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white dark:bg-gray-800 shadow px-6 py-3">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Panel de Administrador
          </h1>
        </header>
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
