// Directorio: src/components
// Tipo: React Component
// Nombre: Login.jsx

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { users } from '../data/users';
import logo from '../assets/logo_aduanas_chile.png';

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ rut: '', password: '', auth: '' });

  // Captcha states
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const canvasRef = useRef(null);

  const navigate = useNavigate();

  // Generar código CAPTCHA alfanumérico
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 6; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaText(text);
    setCaptchaInput('');
    setCaptchaError('');
  };

  // Dibujar CAPTCHA en canvas
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    // Fondo
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, width, height);
    // Texto
    ctx.font = '24px Arial';
    for (let i = 0; i < captchaText.length; i++) {
      const char = captchaText.charAt(i);
      const x = 10 + i * 20;
      const y = 25 + Math.random() * 8;
      const angle = (Math.random() - 0.5) * 0.3;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = '#333';
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }
    // Líneas de ruido
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.strokeStyle = '#888';
      ctx.stroke();
    }
  };

  // Generar y dibujar al montar y cuando cambie el texto
  useEffect(() => {
    generateCaptcha();
  }, []);

  useEffect(() => {
    drawCaptcha();
  }, [captchaText]);

  // Validación RUT
  const validateRutFormat = (value) => /^[0-9]{7,8}-[0-9Kk]$/.test(value);

  const handleRutChange = (e) => {
    const value = e.target.value;
    setRut(value);
    if (!value.trim()) setErrors(prev => ({ ...prev, rut: 'El RUT es obligatorio' }));
    else if (!validateRutFormat(value.trim())) setErrors(prev => ({ ...prev, rut: 'Formato inválido (ej: 12345678-9)' }));
    else setErrors(prev => ({ ...prev, rut: '' }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value.trim()) setErrors(prev => ({ ...prev, password: 'La contraseña es obligatoria' }));
    else setErrors(prev => ({ ...prev, password: '' }));
  };

  const handleCaptchaInput = (e) => {
    const value = e.target.value;
    setCaptchaInput(value);
    if (value.trim().toLowerCase() === captchaText.toLowerCase()) {
      setCaptchaError('');
    } else {
      setCaptchaError('Captcha incorrecto');
    }
  };

  const handleLogin = () => {
    setErrors(prev => ({ ...prev, auth: '' }));
    const user = users.find(u => u.rut === rut.trim() && u.password === password);
    if (!user) {
      setErrors(prev => ({ ...prev, auth: 'Credenciales incorrectas' }));
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    if (['PDI', 'SAG', 'ADUANA'].includes(user.role)) navigate('/admin-code', { state: { user } });
    else navigate('/usuario', { state: { user } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    if (!rut.trim() || errors.rut) hasError = true;
    if (!password.trim() || errors.password) hasError = true;
    if (!captchaInput.trim() || captchaError) hasError = true;
    if (hasError) return;
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Aduanas" className="w-56 h-auto" />
        </div>
        <h1 className="text-lg font-semibold text-primary text-center mb-6">Servicio Nacional de Aduanas</h1>

        <div className="space-y-4">
          {/* RUT */}
          <div>
            <input
              type="text"
              placeholder="RUT (ej: 12345678-9)"
              value={rut}
              onChange={handleRutChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
          </div>

          {/* Contraseña */}
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* CAPTCHA */}
          <div className="flex items-center space-x-4">
            <canvas ref={canvasRef} width={140} height={50} className="border border-gray-300 rounded" />
            <button type="button" onClick={generateCaptcha} className="text-sm text-secondary underline">Recargar</button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Escribe el texto de la imagen"
              value={captchaInput}
              onChange={handleCaptchaInput}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {captchaError && <p className="text-red-500 text-sm mt-1">{captchaError}</p>}
          </div>

          {/* Botón Ingresar */}
          <button
            type="submit"
            disabled={
              !rut.trim() ||
              !!errors.rut ||
              !password.trim() ||
              !!errors.password ||
              !captchaInput.trim() ||
              !!captchaError
            }
            className={`w-full font-bold py-3 rounded-lg transition ${
              !rut.trim() || !!errors.rut || !password.trim() || !!errors.password || !captchaInput.trim() || !!captchaError
                ? 'bg-secondary/50 cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary/90'
            }`}
          >
            Ingresar
          </button>

          {/* Error autenticación */}
          {errors.auth && <p className="text-red-500 text-sm mt-2 text-center">{errors.auth}</p>}
        </div>
      </form>
      <footer className="mt-8 text-center text-white text-sm">© 2025 Servicio Nacional de Aduanas. Todos los derechos reservados.</footer>
    </div>
  );
};

export default Login;