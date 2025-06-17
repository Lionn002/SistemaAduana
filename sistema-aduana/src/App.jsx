// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminCode from './pages/AdminCode';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

// Layout y páginas de usuario
import UserLayout from './pages/user/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import NewDocument from './pages/user/NewDocument';
import DeclarationForm from './pages/user/DeclarationForm';
import VehicleValidation from './pages/user/VehicleValidation';
import StatusCheck from './pages/user/StatusCheck';
import Alerts from './pages/user/Alerts';
import SettingsUser from './pages/user/Settings';

// Layout y páginas de funcionario
import FuncionarioLayout from './layouts/FuncionarioLayout';
import FuncionarioDashboard from './components/FuncionarioDashboard';
import Inspecciones from './pages/funcionario/Inspecciones';
import InspeccionDetail from './pages/funcionario/InspeccionDetail'; // <-- verifícalo
import ReportesPDI from './pages/funcionario/ReportesPDI';
import Certificaciones from './pages/funcionario/Certificaciones';
import ReportesSAG from './pages/funcionario/ReportesSAG';
import Cargas from './pages/funcionario/Cargas';
import Seguimiento from './pages/funcionario/Seguimiento';
import SettingsFuncionario from './pages/user/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-code" element={<AdminCode />} />

      {/* Rutas de usuario */}
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
        <Route path="formulario-jurada" element={<DeclarationForm />} />
        <Route path="validacion-vehiculo" element={<VehicleValidation />} />
        <Route path="mas-tramites" element={<div>Más trámites</div>} />
        <Route path="ajustes" element={<SettingsUser />} />
      </Route>

      {/* Ruta de admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Rutas de funcionario con layout */}
      <Route
        path="/funcionario/*"
        element={
          <ProtectedRoute roles={['PDI', 'SAG', 'ADUANA']}>
            <FuncionarioLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<FuncionarioDashboard />} />
        <Route path="inspecciones" element={<Inspecciones />} />
        <Route path="inspecciones/:id" element={<InspeccionDetail />} />
        <Route path="reportes-pdi" element={<ReportesPDI />} />
        <Route path="certificaciones" element={<Certificaciones />} />
        <Route path="reportes-sag" element={<ReportesSAG />} />
        <Route path="cargas" element={<Cargas />} />
        <Route path="seguimiento" element={<Seguimiento />} />
        <Route path="docs/protocolo" element={<div>Protocolo...</div>} />
        <Route path="docs/manual" element={<div>Manual...</div>} />
        <Route path="docs/reporte" element={<div>Reporte de Fronteras...</div>} />
        <Route path="ajustes" element={<SettingsFuncionario />} />
      </Route>
    </Routes>
  );
}

export default App;
