// src/components/Login.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validate, format } from 'rut.js';
import { users } from '../data/users';
import logo from '../assets/logo_aduanas_chile.png';

export default function Login() {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ rut: '', password: '', auth: '' });
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // Genera texto aleatorio para captcha
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < 6; i++) text += chars.charAt(Math.floor(Math.random() * chars.length));
    setCaptchaText(text);
    setCaptchaInput('');
    setCaptchaError('');
  };

  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f2f2f2';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '24px Arial';
    for (let i = 0; i < captchaText.length; i++) {
      const char = captchaText[i];
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
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = '#888';
      ctx.stroke();
    }
  };

  useEffect(generateCaptcha, []);
  useEffect(drawCaptcha, [captchaText]);

  // Permitir solo dígitos y K/k al final
  const handleRutKeyDown = e => {
    const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab'];
    if (allowed.includes(e.key)) return;
    const { value, selectionStart } = e.target;
    if (/[0-9]/.test(e.key)) return;
    if (/^[kK]$/.test(e.key) && (value.match(/\d/g) || []).length >= 7 && selectionStart === value.length) return;
    e.preventDefault();
  };

  const handleRutChange = e => {
    setRut(e.target.value);
    setErrors(prev => ({ ...prev, rut: '' }));
  };

  const handleRutBlur = () => {
    if (rut) {
      const formatted = format(rut);
      setRut(formatted);
      setErrors(prev => ({ ...prev, rut: validate(formatted) ? '' : 'Formato de RUT inválido' }));
    }
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setErrors(prev => ({ ...prev, password: '' }));
  };

  const handleCaptchaInput = e => {
    const val = e.target.value;
    setCaptchaInput(val);
    setCaptchaError(val.trim().toLowerCase() === captchaText.toLowerCase() ? '' : 'Captcha incorrecto');
  };

  const handleLogin = () => {
    setErrors(prev => ({ ...prev, auth: '' }));
    const user = users.find(u => u.rut === rut && u.password === password);
    if (!user) return setErrors(prev => ({ ...prev, auth: 'Credenciales incorrectas' }));
    if (captchaError) return;
    localStorage.setItem('user', JSON.stringify(user));
    if (['admin','PDI','SAG','ADUANA'].includes(user.role)) {
      navigate('/admin-code', { state: { user } });
    } else {
      navigate('/usuario', { state: { user } });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!rut) return setErrors(prev => ({ ...prev, rut: 'RUT obligatorio' }));
    if (!validate(rut)) return setErrors(prev => ({ ...prev, rut: 'RUT inválido' }));
    if (!password) return setErrors(prev => ({ ...prev, password: 'Contraseña obligatoria' }));
    if (!captchaInput) return setCaptchaError('Ingrese el captcha');
    if (captchaError) return;
    handleLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo Aduanas" className="w-56 h-auto" />
        </div>
        <h1 className="text-center text-lg font-semibold text-primary mb-6">Servicio Nacional de Aduanas</h1>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Ingrese RUT"
              value={rut}
              onKeyDown={handleRutKeyDown}
              onChange={handleRutChange}
              onBlur={handleRutBlur}
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-4 py-2"
            />
            {errors.rut && <p className="text-red-500 text-sm mt-1">{errors.rut}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-4 py-2"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="flex items-center space-x-4">
            <canvas ref={canvasRef} width={140} height={50} className="border border-gray-300 rounded" />
            <button type="button" onClick={generateCaptcha} className="text-sm text-secondary underline">
              Recargar
            </button>
          </div>
          <div>
            <input
              type="text"
              maxLength={6}
              placeholder="Ingrese captcha"
              value={captchaInput}
              onChange={handleCaptchaInput}
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-4 py-2 text-center"
            />
            {captchaError && <p className="text-red-500 text-sm mt-1">{captchaError}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-secondary dark:bg-secondary/80 text-white py-2 rounded-lg hover:bg-secondary/90 transition"
          >
            Ingresar
          </button>
          {errors.auth && <p className="text-red-500 text-sm text-center mt-2">{errors.auth}</p>}
        </div>
        <div className="text-center mt-4">
          <Link
            to="/olvide-contrasena"
            className="text-sm text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-secondary"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </form>
    </div>
  );
}
