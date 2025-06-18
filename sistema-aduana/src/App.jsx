import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import AdminCode from './pages/AdminCode';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import FuncionarioLayout from './layouts/FuncionarioLayout';
import UserLayout from './layouts/UserLayout';

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

// Funcionario pages
import FuncionarioDashboard from './components/FuncionarioDashboard';
import Inspecciones from './pages/funcionario/Inspecciones';
import InspeccionDetail from './pages/funcionario/InspeccionDetail';
import ReportesPDI from './pages/funcionario/ReportesPDI';
import Certificaciones from './pages/funcionario/Certificaciones';
import ReportesSAG from './pages/funcionario/ReportesSAG';
import Cargas from './pages/funcionario/Cargas';
import Seguimiento from './pages/funcionario/Seguimiento';
import RegistroPersona from './pages/funcionario/RegistroPersona';
import RegistroVehiculo from './pages/funcionario/RegistroVehiculo';
import EscaneoQR from './pages/funcionario/EscaneoQR';
import Informes from './pages/funcionario/Informes';
import SettingsFuncionario from './pages/funcionario/Settings';
import RegistroMenores from './pages/funcionario/RegistroMenores';

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

        {/* Declaraciones RF09 (Usuario) */}
        <Route path="declarar-alimentos" element={<DeclaracionAlimentos />} />
        <Route path="declarar-vehiculo" element={<DeclaracionVehiculoPDI />} />
        <Route path="declarar-menor" element={<DeclaracionMenorPDI />} />
        <Route path="historial" element={<HistorialDeclaraciones />} />
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

      {/* Funcionario */}
      <Route
        path="/funcionario/*"
        element={
          <ProtectedRoute roles={['PDI','SAG','ADUANA']}>
            <FuncionarioLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FuncionarioDashboard />} />
        <Route path="registro-persona" element={<RegistroPersona />} />
        <Route path="registro-menores" element={<RegistroMenores />} />
        <Route path="registro-vehiculo" element={<RegistroVehiculo />} />
        <Route path="inspecciones" element={<Inspecciones />} />
        <Route path="inspecciones/:id" element={<InspeccionDetail />} />
        <Route path="reportes-pdi" element={<ReportesPDI />} />
        <Route path="certificaciones" element={<Certificaciones />} />
        <Route path="reportes-sag" element={<ReportesSAG />} />
        <Route path="cargas" element={<Cargas />} />
        <Route path="seguimiento" element={<Seguimiento />} />
        <Route path="escaneo-qr" element={<EscaneoQR />} />
        <Route path="informes" element={<Informes />} />
        <Route path="ajustes" element={<SettingsFuncionario />} />

        {/* Declaraciones RF09 (Funcionario) */}
        <Route path="declaracion-alimentos" element={<DeclaracionAlimentos />} />
        <Route path="declaracion-vehiculo" element={<DeclaracionVehiculoPDI />} />
        <Route path="revision-alimentos" element={<RevisionAlimentos />} />
        <Route path="historial-declaraciones" element={<HistorialDeclaraciones />} />
      </Route>
    </Routes>
  );
}

export default App;
