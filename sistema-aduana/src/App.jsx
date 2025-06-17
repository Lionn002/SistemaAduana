import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import AdminCode from './pages/AdminCode';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './routes/ProtectedRoute';

// Layout de usuario
import UserLayout from './pages/user/UserLayout';

// Páginas de usuario
import UserDashboard from './pages/user/UserDashboard';
import NewDocument from './pages/user/NewDocument';
import DeclarationForm from './pages/user/DeclarationForm';
import VehicleValidation from './pages/user/VehicleValidation';
import StatusCheck from './pages/user/StatusCheck';
import Alerts from './pages/user/Alerts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/admin-code" element={<AdminCode />} />

      {/* Rutas protegidas de usuario */}
      <Route
        path="/usuario/*"
        element={
          <ProtectedRoute role="usuario">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        {/* Ruta por defecto: Dashboard */}
        <Route index element={<UserDashboard />} />
        <Route path="nueva-declaracion" element={<NewDocument />} />
        <Route path="formulario-jurada" element={<DeclarationForm />} />
        <Route path="validacion-vehiculo" element={<VehicleValidation />} />
        <Route path="consulta-estado" element={<StatusCheck />} />
        <Route path="alertas" element={<Alerts />} />
      </Route>

      {/* Ruta protegida de admin */}
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
