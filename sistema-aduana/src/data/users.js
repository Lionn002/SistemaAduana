export const users = [
  {
    rut: '11111111-1',
    password: 'usuario123',
    role: 'usuario',
  },
  {
    rut: '22222222-2',
    password: 'admin123',
    role: 'admin',
    codigo: Math.floor(100000 + Math.random() * 900000).toString(), 
  },
];
