// src/data/logs.js
const logs = [
  {
    id: 1,
    fecha: '17/06/2025 10:24',
    modulo: 'Declaración de Vehículo',
    usuario: '22.222.222-2',
    tipo: 'Error de validación',
    mensaje: 'Campo "año" contiene texto en vez de número'
  },
  {
    id: 2,
    fecha: '17/06/2025 10:31',
    modulo: 'Inicio de sesión',
    usuario: 'invitado',
    tipo: 'Autenticación fallida',
    mensaje: 'Intento de login con credenciales incorrectas'
  },
  {
    id: 3,
    fecha: '17/06/2025 10:45',
    modulo: 'Registro de Menores',
    usuario: '11.111.111-1',
    tipo: 'Excepción no controlada',
    mensaje: 'Fallo al cargar el componente de fecha'
  }
];

export default logs;
