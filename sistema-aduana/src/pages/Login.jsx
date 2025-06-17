import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import logo from '../assets/logo_aduanas_chile.png';

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = users.find(u => u.rut === rut && u.password === password);
    if (!user) {
      alert('Credenciales incorrectas');
      return;
    }
    // Guardar usuario en localStorage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirigir según rol
    if (['PDI', 'SAG', 'ADUANA'].includes(user.role)) {
      navigate('/admin-code', { state: { user } });
    } else {
      navigate('/usuario', { state: { user } });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-auto"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Aduanas" className="w-56 h-auto" />
        </div>

        <h1 className="text-lg font-semibold text-primary text-center mb-6">
          Servicio Nacional de Aduanas
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="RUT"
            value={rut}
            onChange={e => setRut(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
          <button
            type="submit"
            className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-secondary/90 transition"
          >
            Ingresar
          </button>
        </div>
      </form>

      {/* Footer */}
      <footer className="mt-8 text-center text-white text-sm">
        © 2025 Servicio Nacional de Aduanas. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default Login;