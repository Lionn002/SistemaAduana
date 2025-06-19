// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminCode from './pages/AdminCode';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import UserLayout from './layouts/UserLayout';
import PDILayout from './layouts/PDILayout';
import SAGLayout from './layouts/SAGLayout';
import AduanaLayout from './layouts/AduanaLayout';

// Admin pages
import AdminDashboard from './pages/AdminDashboard';
import RegistroUsuario from './pages/funcionario/RegistroUsuario';
import SettingsAdmin from './pages/admin/SettingsAdmin';
import RegistroErrores from './pages/admin/RegistroErrores';

// Usuario pages
import UserDashboard from './pages/user/UserDashboard';
import NewDocument from './pages/user/NewDocument';
import StatusCheck from './pages/user/StatusCheck';
import Alerts from './pages/user/Alerts';
import SettingsUser from './pages/user/Settings';
import MasTramites from './pages/user/MasTramites';
import FormularioJurada from './pages/user/FormularioJurada';
import Adjuntos from './pages/user/Adjuntos';
import Ayuda from './pages/user/Ayuda';

// Funcionario comunes
import FuncionarioDashboard from './components/FuncionarioDashboard';
import RegistroPersona from './pages/funcionario/RegistroPersona';
import RegistroVehiculo from './pages/funcionario/RegistroVehiculo';
import EscaneoQR from './pages/funcionario/EscaneoQR';
import Informes from './pages/funcionario/Informes';
import SettingsFuncionario from './pages/funcionario/Settings';
import RegistroMenores from './pages/funcionario/RegistroMenores';
import Cargas from './pages/funcionario/Cargas';
import Seguimiento from './pages/funcionario/Seguimiento';

// Documentos compartidos
import Protocolo from './pages/docs/protocolo';
import Manual from './pages/docs/manual';
import Reporte from './pages/docs/reporte';

// Declaraciones RF09
import DeclaracionAlimentos from './pages/declaraciones/DeclaracionAlimentos';
import DeclaracionVehiculoPDI from './pages/declaraciones/DeclaracionVehiculoPDI';
import DeclaracionMenorPDI from './pages/declaraciones/DeclaracionMenorPDI';
import RevisionAlimentos from './pages/declaraciones/RevisionAlimentos';
import HistorialDeclaraciones from './pages/declaraciones/HistorialDeclaraciones';

// Route guard
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/olvide-contrasena" element={<ForgotPassword />} />
      <Route path="/restablecer-contrasena" element={<ResetPassword />} />
      <Route path="/admin-code" element={<AdminCode />} />

      {/* Usuario */}
      <Route
        path="/usuario/*"
        element={
          <ProtectedRoute role="usuario">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="consulta-estado" element={<StatusCheck />} />
        <Route path="nueva-declaracion" element={<NewDocument />} />
        <Route path="alertas" element={<Alerts />} />
        <Route path="ajustes" element={<SettingsUser />} />
        <Route path="declarar-alimentos" element={<DeclaracionAlimentos />} />
        <Route path="declarar-vehiculo" element={<DeclaracionVehiculoPDI />} />
        <Route path="declarar-menor" element={<DeclaracionMenorPDI />} />
        <Route path="historial" element={<HistorialDeclaraciones />} />
        <Route path="formulario-jurada" element={<FormularioJurada />} />
        <Route path="adjuntos" element={<Adjuntos />} />
        <Route path="ayuda" element={<Ayuda />} />
        <Route path="mas-tramites" element={<MasTramites />} />
      </Route>

      {/* Admin */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="registro-usuario" element={<RegistroUsuario />} />
        <Route path="logs" element={<RegistroErrores />} />
        <Route path="ajustes" element={<SettingsAdmin />} />
      </Route>

      {/* PDI */}
      <Route
        path="/funcionario-pdi/*"
        element={
          <ProtectedRoute role="PDI">
            <PDILayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FuncionarioDashboard />} />
        <Route path="registro-persona" element={<RegistroPersona />} />
        <Route path="registro-menores" element={<RegistroMenores />} />
        <Route path="declaracion-vehiculo" element={<DeclaracionVehiculoPDI />} />
        <Route path="revision-alimentos" element={<RevisionAlimentos />} />
        <Route path="historial-declaraciones" element={<HistorialDeclaraciones />} />
        <Route path="escaneo-qr" element={<EscaneoQR />} />
        <Route path="informes" element={<Informes />} />
        <Route path="ajustes" element={<SettingsFuncionario />} />
        <Route path="docs/protocolo" element={<Protocolo />} />
        <Route path="docs/manual" element={<Manual />} />
        <Route path="docs/reporte" element={<Reporte />} />
      </Route>

      {/* SAG */}
      <Route
        path="/funcionario-sag/*"
        element={
          <ProtectedRoute role="SAG">
            <SAGLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FuncionarioDashboard />} />
        <Route path="registro-persona" element={<RegistroPersona />} />
        <Route path="declaracion-alimentos" element={<DeclaracionAlimentos />} />
        <Route path="revision-alimentos" element={<RevisionAlimentos />} />
        <Route path="historial-declaraciones" element={<HistorialDeclaraciones />} />
        <Route path="escaneo-qr" element={<EscaneoQR />} />
        <Route path="informes" element={<Informes />} />
        <Route path="ajustes" element={<SettingsFuncionario />} />
        <Route path="docs/protocolo" element={<Protocolo />} />
        <Route path="docs/manual" element={<Manual />} />
        <Route path="docs/reporte" element={<Reporte />} />
      </Route>

      {/* ADUANA */}
      <Route
        path="/funcionario-aduana/*"
        element={
          <ProtectedRoute role="ADUANA">
            <AduanaLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FuncionarioDashboard />} />
        <Route path="registro-persona" element={<RegistroPersona />} />
        <Route path="registro-vehiculo" element={<RegistroVehiculo />} />
        <Route path="cargas" element={<Cargas />} />
        <Route path="seguimiento" element={<Seguimiento />} />
        <Route path="escaneo-qr" element={<EscaneoQR />} />
        <Route path="informes" element={<Informes />} />
        <Route path="ajustes" element={<SettingsFuncionario />} />
        <Route path="docs/protocolo" element={<Protocolo />} />
        <Route path="docs/manual" element={<Manual />} />
        <Route path="docs/reporte" element={<Reporte />} />
      </Route>
        
    </Routes>
  );
}

export default App;
