// src/components/Login.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validate, format } from 'rut.js';
import { users } from '../data/users';
import logo from '../assets/logo_aduanas_chile.png';

export default function Login() {
  const [useRut, setUseRut] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ input: '', password: '', auth: '' });
  const [captchaText, setCaptchaText] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const canvasRef = useRef(null);
  const navigate = useNavigate();

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

  const handleInputChange = e => {
    setInputValue(e.target.value);
    setErrors(prev => ({ ...prev, input: '' }));
  };

  const handleInputBlur = () => {
    if (useRut && inputValue) {
      const formatted = format(inputValue);
      setInputValue(formatted);
      setErrors(prev => ({ ...prev, input: validate(formatted) ? '' : 'Formato de RUT inválido' }));
    } else if (!useRut && inputValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors(prev => ({ ...prev, input: emailRegex.test(inputValue) ? '' : 'Correo inválido' }));
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
    const user = users.find(u =>
      useRut ? u.rut === inputValue : u.email === inputValue
    );
    if (!user || user.password !== password)
      return setErrors(prev => ({ ...prev, auth: 'Credenciales incorrectas' }));
    if (captchaError) return;

    localStorage.setItem('user', JSON.stringify(user));

    if (['admin', 'PDI', 'SAG', 'ADUANA'].includes(user.role)) {
      navigate('/admin-code');
    } else if (user.role === 'usuario') {
      navigate('/usuario');
    } else {
      navigate('/');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue)
      return setErrors(prev => ({ ...prev, input: useRut ? 'RUT obligatorio' : 'Correo obligatorio' }));
    if (useRut && !validate(inputValue))
      return setErrors(prev => ({ ...prev, input: 'RUT inválido' }));
    if (!useRut) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue))
        return setErrors(prev => ({ ...prev, input: 'Correo inválido' }));
    }
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

        <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Ingresar con: {useRut ? 'RUT' : 'Correo'}
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={!useRut}
            onChange={() => setUseRut(!useRut)}
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:bg-blue-600 transition duration-300">
          </div>
          <div className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-300 peer-checked:translate-x-7"></div>
        </label>
      </div>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder={useRut ? 'Ingrese RUT' : 'Ingrese correo'}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-full border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded px-4 py-2"
            />
            {errors.input && <p className="text-red-500 text-sm mt-1">{errors.input}</p>}
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
