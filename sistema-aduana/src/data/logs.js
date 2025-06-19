const logs = [
  {
    "id": 1,
    "fecha": "17/06/2025 08:13",
    "modulo": "Generación de Informes",
    "usuario": "invitado",
    "tipo": "Acceso denegado",
    "mensaje": "Permisos insuficientes"
  },
  {
    "id": 2,
    "fecha": "17/06/2025 12:50",
    "modulo": "Inicio de sesión",
    "usuario": "22.222.222-2",
    "tipo": "Error de validación",
    "mensaje": "Error inesperado en ejecución"
  },
  {
    "id": 3,
    "fecha": "17/06/2025 12:14",
    "modulo": "Configuración",
    "usuario": "invitado",
    "tipo": "Acceso denegado",
    "mensaje": "Permisos insuficientes"
  },
  {
    "id": 4,
    "fecha": "17/06/2025 10:31",
    "modulo": "Inicio de sesión",
    "usuario": "11.111.111-1",
    "tipo": "Acceso denegado",
    "mensaje": "Token expirado"
  },
  {
    "id": 5,
    "fecha": "17/06/2025 10:49",
    "modulo": "Panel Admin",
    "usuario": "22.222.222-2",
    "tipo": "Excepción no controlada",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 6,
    "fecha": "17/06/2025 08:06",
    "modulo": "Registro de Menores",
    "usuario": "22.222.222-2",
    "tipo": "Error de validación",
    "mensaje": "Conexión perdida con la base de datos"
  },
  {
    "id": 7,
    "fecha": "17/06/2025 08:58",
    "modulo": "Registro de Menores",
    "usuario": "33.333.333-3",
    "tipo": "Acceso denegado",
    "mensaje": "Token expirado"
  },
  {
    "id": 8,
    "fecha": "17/06/2025 08:16",
    "modulo": "Registro de Menores",
    "usuario": "invitado",
    "tipo": "Autenticación fallida",
    "mensaje": "Entrada no válida"
  },
  {
    "id": 9,
    "fecha": "17/06/2025 10:42",
    "modulo": "Inicio de sesión",
    "usuario": "invitado",
    "tipo": "Acceso denegado",
    "mensaje": "Error inesperado en ejecución"
  },
  {
    "id": 10,
    "fecha": "17/06/2025 11:50",
    "modulo": "Inicio de sesión",
    "usuario": "22.222.222-2",
    "tipo": "Timeout",
    "mensaje": "Permisos insuficientes"
  },
  {
    "id": 11,
    "fecha": "17/06/2025 09:37",
    "modulo": "Configuración",
    "usuario": "33.333.333-3",
    "tipo": "Timeout",
    "mensaje": "Fallo de renderizado del módulo"
  },
  {
    "id": 12,
    "fecha": "17/06/2025 08:09",
    "modulo": "Declaración de Alimentos",
    "usuario": "22.222.222-2",
    "tipo": "Acceso denegado",
    "mensaje": "Valor fuera de rango"
  },
  {
    "id": 13,
    "fecha": "17/06/2025 08:45",
    "modulo": "Panel Admin",
    "usuario": "44.444.444-4",
    "tipo": "Error de validación",
    "mensaje": "Fallo de renderizado del módulo"
  },
  {
    "id": 14,
    "fecha": "17/06/2025 09:51",
    "modulo": "Registro de Vehículo",
    "usuario": "22.222.222-2",
    "tipo": "Error de validación",
    "mensaje": "Permisos insuficientes"
  },
  {
    "id": 15,
    "fecha": "17/06/2025 12:32",
    "modulo": "Registro de Usuario",
    "usuario": "11.111.111-1",
    "tipo": "Acceso denegado",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 16,
    "fecha": "17/06/2025 09:43",
    "modulo": "Configuración",
    "usuario": "33.333.333-3",
    "tipo": "Excepción no controlada",
    "mensaje": "Token expirado"
  },
  {
    "id": 17,
    "fecha": "17/06/2025 08:05",
    "modulo": "Registro de Vehículo",
    "usuario": "44.444.444-4",
    "tipo": "Acceso denegado",
    "mensaje": "Conexión perdida con la base de datos"
  },
  {
    "id": 18,
    "fecha": "17/06/2025 10:34",
    "modulo": "Registro de Vehículo",
    "usuario": "44.444.444-4",
    "tipo": "Error de validación",
    "mensaje": "Fallo de renderizado del módulo"
  },
  {
    "id": 19,
    "fecha": "17/06/2025 11:05",
    "modulo": "Generación de Informes",
    "usuario": "33.333.333-3",
    "tipo": "Timeout",
    "mensaje": "Fallo al cargar componente"
  },
  {
    "id": 20,
    "fecha": "17/06/2025 12:31",
    "modulo": "Registro de Menores",
    "usuario": "invitado",
    "tipo": "Error de validación",
    "mensaje": "Error inesperado en ejecución"
  },
  {
    "id": 21,
    "fecha": "17/06/2025 10:48",
    "modulo": "Escaneo de QR",
    "usuario": "44.444.444-4",
    "tipo": "Excepción no controlada",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 22,
    "fecha": "17/06/2025 12:45",
    "modulo": "Registro de Usuario",
    "usuario": "44.444.444-4",
    "tipo": "Acceso denegado",
    "mensaje": "Entrada no válida"
  },
  {
    "id": 23,
    "fecha": "17/06/2025 10:41",
    "modulo": "Registro de Usuario",
    "usuario": "44.444.444-4",
    "tipo": "Excepción no controlada",
    "mensaje": "Valor fuera de rango"
  },
  {
    "id": 24,
    "fecha": "17/06/2025 08:17",
    "modulo": "Registro de Menores",
    "usuario": "11.111.111-1",
    "tipo": "Excepción no controlada",
    "mensaje": "Token expirado"
  },
  {
    "id": 25,
    "fecha": "17/06/2025 11:55",
    "modulo": "Generación de Informes",
    "usuario": "44.444.444-4",
    "tipo": "Autenticación fallida",
    "mensaje": "Permisos insuficientes"
  },
  {
    "id": 26,
    "fecha": "17/06/2025 10:43",
    "modulo": "Generación de Informes",
    "usuario": "invitado",
    "tipo": "Excepción no controlada",
    "mensaje": "Campo obligatorio vacío"
  },
  {
    "id": 27,
    "fecha": "17/06/2025 11:54",
    "modulo": "Generación de Informes",
    "usuario": "invitado",
    "tipo": "Timeout",
    "mensaje": "Error inesperado en ejecución"
  },
  {
    "id": 28,
    "fecha": "17/06/2025 11:57",
    "modulo": "Declaración de Alimentos",
    "usuario": "22.222.222-2",
    "tipo": "Autenticación fallida",
    "mensaje": "Token expirado"
  },
  {
    "id": 29,
    "fecha": "17/06/2025 10:33",
    "modulo": "Registro de Usuario",
    "usuario": "invitado",
    "tipo": "Autenticación fallida",
    "mensaje": "Entrada no válida"
  },
  {
    "id": 30,
    "fecha": "17/06/2025 11:10",
    "modulo": "Panel Admin",
    "usuario": "invitado",
    "tipo": "Excepción no controlada",
    "mensaje": "Campo obligatorio vacío"
  },
  {
    "id": 31,
    "fecha": "17/06/2025 10:58",
    "modulo": "Registro de Vehículo",
    "usuario": "33.333.333-3",
    "tipo": "Excepción no controlada",
    "mensaje": "Fallo al cargar componente"
  },
  {
    "id": 32,
    "fecha": "17/06/2025 09:08",
    "modulo": "Registro de Vehículo",
    "usuario": "44.444.444-4",
    "tipo": "Excepción no controlada",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 33,
    "fecha": "17/06/2025 08:13",
    "modulo": "Generación de Informes",
    "usuario": "44.444.444-4",
    "tipo": "Timeout",
    "mensaje": "Fallo de renderizado del módulo"
  },
  {
    "id": 34,
    "fecha": "17/06/2025 08:36",
    "modulo": "Registro de Vehículo",
    "usuario": "11.111.111-1",
    "tipo": "Autenticación fallida",
    "mensaje": "Fallo al cargar componente"
  },
  {
    "id": 35,
    "fecha": "17/06/2025 10:03",
    "modulo": "Registro de Menores",
    "usuario": "admin",
    "tipo": "Excepción no controlada",
    "mensaje": "Error inesperado en ejecución"
  },
  {
    "id": 36,
    "fecha": "17/06/2025 12:26",
    "modulo": "Generación de Informes",
    "usuario": "admin",
    "tipo": "Autenticación fallida",
    "mensaje": "Valor fuera de rango"
  },
  {
    "id": 37,
    "fecha": "17/06/2025 12:06",
    "modulo": "Registro de Usuario",
    "usuario": "11.111.111-1",
    "tipo": "Excepción no controlada",
    "mensaje": "Token expirado"
  },
  {
    "id": 38,
    "fecha": "17/06/2025 10:17",
    "modulo": "Registro de Vehículo",
    "usuario": "11.111.111-1",
    "tipo": "Acceso denegado",
    "mensaje": "Entrada no válida"
  },
  {
    "id": 39,
    "fecha": "17/06/2025 08:36",
    "modulo": "Registro de Vehículo",
    "usuario": "11.111.111-1",
    "tipo": "Acceso denegado",
    "mensaje": "Valor fuera de rango"
  },
  {
    "id": 40,
    "fecha": "17/06/2025 08:44",
    "modulo": "Registro de Usuario",
    "usuario": "admin",
    "tipo": "Acceso denegado",
    "mensaje": "Fallo al cargar componente"
  },
  {
    "id": 41,
    "fecha": "17/06/2025 11:57",
    "modulo": "Registro de Vehículo",
    "usuario": "invitado",
    "tipo": "Excepción no controlada",
    "mensaje": "Valor fuera de rango"
  },
  {
    "id": 42,
    "fecha": "17/06/2025 11:04",
    "modulo": "Declaración de Alimentos",
    "usuario": "33.333.333-3",
    "tipo": "Timeout",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 43,
    "fecha": "17/06/2025 08:16",
    "modulo": "Inicio de sesión",
    "usuario": "11.111.111-1",
    "tipo": "Error de validación",
    "mensaje": "Campo obligatorio vacío"
  },
  {
    "id": 44,
    "fecha": "17/06/2025 10:00",
    "modulo": "Registro de Usuario",
    "usuario": "invitado",
    "tipo": "Timeout",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 45,
    "fecha": "17/06/2025 12:45",
    "modulo": "Configuración",
    "usuario": "33.333.333-3",
    "tipo": "Error de validación",
    "mensaje": "Token expirado"
  },
  {
    "id": 46,
    "fecha": "17/06/2025 12:01",
    "modulo": "Registro de Vehículo",
    "usuario": "33.333.333-3",
    "tipo": "Timeout",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 47,
    "fecha": "17/06/2025 09:59",
    "modulo": "Registro de Usuario",
    "usuario": "11.111.111-1",
    "tipo": "Error de validación",
    "mensaje": "Intento de login con credenciales incorrectas"
  },
  {
    "id": 48,
    "fecha": "17/06/2025 09:08",
    "modulo": "Declaración de Alimentos",
    "usuario": "33.333.333-3",
    "tipo": "Timeout",
    "mensaje": "Error inesperado en ejecución"
  },
  {
    "id": 49,
    "fecha": "17/06/2025 11:16",
    "modulo": "Registro de Usuario",
    "usuario": "11.111.111-1",
    "tipo": "Timeout",
    "mensaje": "Fallo de renderizado del módulo"
  },
  {
    "id": 50,
    "fecha": "17/06/2025 12:41",
    "modulo": "Panel Admin",
    "usuario": "invitado",
    "tipo": "Acceso denegado",
    "mensaje": "Conexión perdida con la base de datos"
  }
];

export default logs;