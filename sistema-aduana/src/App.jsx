// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminCode from './pages/AdminCode';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

// User pages & layout
import UserLayout from './pages/user/UserLayout';
import UserDashboard from './pages/user/UserDashboard';
import NewDocument from './pages/user/NewDocument';
import DeclarationForm from './pages/user/DeclarationForm';
import VehicleValidation from './pages/user/VehicleValidation';
import StatusCheck from './pages/user/StatusCheck';
import Alerts from './pages/user/Alerts';
import Settings from './pages/user/Settings';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-code" element={<AdminCode />} />
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
        <Route path="ajustes" element={<Settings />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
