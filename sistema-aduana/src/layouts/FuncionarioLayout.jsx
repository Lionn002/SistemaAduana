// src/layouts/FuncionarioLayout.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, FileText, ClipboardList, Settings, LogOut, Clock } from 'lucide-react';
import logo from '../assets/logo_aduanas_chile.png';

export default function FuncionarioLayout() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
  const user = state?.user || storedUser;
  const [now, setNow] = useState(new Date());

  // Reloj
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Verificar rol
  useEffect(() => {
    if (!user || !['PDI','SAG','ADUANA'].includes(user.role)) {
      navigate('/');
    }
  }, [user, navigate]);

  const sectionsByRole = {
    PDI: [
      { label: 'Inspecciones', to: 'inspecciones', icon: Home },
      { label: 'Reportes PDI', to: 'reportes-pdi', icon: ClipboardList }
    ],
    SAG: [
      { label: 'Certificaciones', to: 'certificaciones', icon: Home },
      { label: 'Reportes SAG', to: 'reportes-sag', icon: ClipboardList }
    ],
    ADUANA: [
      { label: 'Gestión de Cargas', to: 'cargas', icon: Home },
      { label: 'Seguimiento', to: 'seguimiento', icon: ClipboardList }
    ]
  };
  const sections = sectionsByRole[user.role] || [];

  const commonDocs = [
    { name: 'Protocolo de Operaciones', to: 'docs/protocolo' },
    { name: 'Manual de Coordinación', to: 'docs/manual' },
    { name: 'Reporte de Fronteras', to: 'docs/reporte' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1f3a] dark:bg-gray-800 text-white flex flex-col justify-between shadow-lg">
        <div>
          <div className="p-6 flex justify-center">
            <img src={logo} alt="Logo Aduanas" className="w-20 h-20" />
          </div>
          <nav className="px-4 space-y-2">
            <NavLink
              to="/funcionario"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition ${
                  isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
                }`
              }
            >
              <Home className="w-5 h-5 text-white" />
              Inicio
            </NavLink>
            {sections.map((sec, idx) => (
              <NavLink
                key={idx}
                to={`/funcionario/${sec.to}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded transition ${
                    isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
                  }`
                }
              >
                <sec.icon className="w-5 h-5 text-white" />
                {sec.label}
              </NavLink>
            ))}
            <h3 className="mt-6 px-4 text-xs font-semibold uppercase text-gray-300">
              Documentos
            </h3>
            {commonDocs.map((doc, idx) => (
              <NavLink
                key={idx}
                to={`/funcionario/${doc.to}`}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded transition ${
                    isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
                  }`
                }
              >
                <FileText className="w-5 h-5 text-white" />
                {doc.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-4 pb-6 space-y-2">
          <NavLink
            to="/funcionario/ajustes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded transition ${
                isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'
              }`
            }
          >
            <Settings className="w-5 h-5 text-white" />
            Ajustes
          </NavLink>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 hover:bg-red-600 rounded transition text-red-100 w-full text-left"
          >
            <LogOut className="w-5 h-5 text-red-100" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-white dark:bg-gray-800 shadow flex items-center justify-end px-6 py-3 sticky top-0 z-10">
          <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {now.toLocaleDateString()} {now.toLocaleTimeString()}
          </span>
        </header>

        {/* Contenido */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
