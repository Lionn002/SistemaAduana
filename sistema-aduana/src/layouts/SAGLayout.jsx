// src/layouts/SAGLayout.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Home, FileText, ClipboardList, Settings, LogOut, Clock, QrCode
} from 'lucide-react';
import logo from '../assets/logo_aduanas_chile.png';

export default function SAGLayout() {
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user || user.role !== 'SAG') navigate('/');
  }, [user, navigate]);

  const sections = [
    { label: 'Registro de Personas', to: 'registro-persona', icon: ClipboardList },
    { label: 'Declarar Alimentos', to: 'declaracion-alimentos', icon: ClipboardList },
    { label: 'Revisión de Declaraciones', to: 'revision-alimentos', icon: ClipboardList },
    { label: 'Historial de Trámites', to: 'historial-declaraciones', icon: FileText }
  ];

  const commonDocs = [
    { name: 'Protocolo de Operaciones', to: 'docs/protocolo' },
    { name: 'Manual de Coordinación', to: 'docs/manual' },
    { name: 'Reporte de Fronteras', to: 'docs/reporte' }
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <aside className="w-64 bg-[#0b1f3a] dark:bg-gray-800 text-white flex flex-col justify-between shadow-lg">
        <div>
          <div className="p-6 flex justify-center">
            <img src={logo} alt="Logo Aduanas" className="w-65 h-30" />
          </div>
          <nav className="px-4 space-y-2">
            <NavLink to="/funcionario-sag" end className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded ${isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'}`}>
              <Home className="w-5 h-5 text-white" /> Inicio
            </NavLink>

            {sections.map((sec, idx) => (
              <NavLink key={idx} to={`/funcionario-sag/${sec.to}`} className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded ${isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'}`}>
                <sec.icon className="w-5 h-5 text-white" />
                {sec.label}
              </NavLink>
            ))}

            <h3 className="mt-6 px-4 text-xs font-semibold uppercase text-gray-300">Documentos</h3>
            {commonDocs.map((doc, idx) => (
              <NavLink key={idx} to={`/funcionario-sag/${doc.to}`} className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded ${isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'}`}>
                <FileText className="w-5 h-5 text-white" />
                {doc.name}
              </NavLink>
            ))}

            <NavLink to="/funcionario-sag/escaneo-qr" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded ${isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'}`}>
              <QrCode className="w-5 h-5 text-white" /> Escaneo de Cédula (QR)
            </NavLink>

            <NavLink to="/funcionario-sag/informes" className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded ${isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'}`}>
              <ClipboardList className="w-5 h-5 text-white" /> Informes
            </NavLink>
          </nav>
        </div>

        <div className="px-4 pb-6 space-y-2">
          <NavLink to="/funcionario-sag/ajustes" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded ${isActive ? 'bg-[#0a192f]' : 'hover:bg-[#0a192f]'}`}>
            <Settings className="w-5 h-5 text-white" /> Ajustes
          </NavLink>
          <button onClick={() => { localStorage.removeItem('user'); navigate('/'); }}
            className="flex items-center gap-3 px-4 py-2 hover:bg-red-600 rounded text-red-100 w-full text-left">
            <LogOut className="w-5 h-5 text-red-100" /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="w-full bg-white dark:bg-gray-800 shadow flex items-center justify-end px-6 py-3 sticky top-0 z-10">
          <Clock className="w-5 h-5 text-gray-600 dark:text-gray-300 mr-2" />
          <span className="text-gray-700 dark:text-gray-200 font-medium">
            {now.toLocaleDateString()} {now.toLocaleTimeString()}
          </span>
        </header>
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
