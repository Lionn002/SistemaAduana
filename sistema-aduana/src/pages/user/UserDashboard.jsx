import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText, FiClipboard, FiTruck, FiSearch, FiBell
} from 'react-icons/fi';

const cards = [
  {
    title: 'Nueva declaración/documentación',
    icon: <FiFileText className="text-4xl text-secondary mb-2" />,
    to: '/usuario/nueva-declaracion'
  },
  {
    title: 'Formulario de declaración jurada',
    icon: <FiClipboard className="text-4xl text-secondary mb-2" />,
    to: '/usuario/formulario-jurada'
  },
  {
    title: 'Registro y validación de vehículos',
    icon: <FiTruck className="text-4xl text-secondary mb-2" />,
    to: '/usuario/validacion-vehiculo'
  },
  {
    title: 'Consultar estado de trámite',
    icon: <FiSearch className="text-4xl text-secondary mb-2" />,
    to: '/usuario/consulta-estado'
  },
  {
    title: 'Alertas / Notificaciones',
    icon: <FiBell className="text-4xl text-secondary mb-2" />,
    to: '/usuario/alertas'
  }
];

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(u);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Bienvenido{user?.name ? `, ${user.name}` : ''} 👋
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Selecciona una opción para iniciar o consultar tus trámites.
      </p>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="flex flex-col items-center bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-[1.02] transition-transform duration-200"
          >
            {card.icon}
            <span className="mt-2 text-center font-medium text-gray-800 dark:text-gray-100">
              {card.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
