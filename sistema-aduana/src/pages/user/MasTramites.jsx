import { FilePlus, Info, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const MasTramites = () => {
  const accesos = [
    {
      titulo: 'Formulario declaración aduanera',
      descripcion: 'Completa tu declaración jurada para ingresar productos, alimentos o equipaje.',
      icono: <FilePlus className="w-6 h-6 text-primary" />,
      ruta: '/usuario/formulario-jurada'
    },
    {
      titulo: 'Documentos adjuntos',
      descripcion: 'Sube o revisa documentación adicional requerida en tus trámites.',
      icono: <BookOpen className="w-6 h-6 text-primary" />,
      ruta: '/usuario/adjuntos'
    },
    {
      titulo: 'Ayuda y preguntas frecuentes',
      descripcion: 'Resuelve dudas sobre los tipos de trámites y cómo completarlos.',
      icono: <Info className="w-6 h-6 text-primary" />,
      ruta: '/usuario/ayuda'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Más Trámites y Recursos</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {accesos.map((item, i) => (
          <Link
            key={i}
            to={item.ruta}
            className="bg-gray-100 dark:bg-gray-700 p-5 rounded-lg shadow hover:shadow-lg hover:scale-[1.02] transition-transform"
          >
            <div className="flex items-center gap-3 mb-2">
              {item.icono}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.titulo}</h3>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">{item.descripcion}</p>
          </Link>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg text-blue-800 dark:text-blue-300">
        <p>
          Si tienes dudas o necesitas asistencia, puedes comunicarte con el soporte en frontera o visitar
          nuestra sección de ayuda. Todos los formularios deben completarse antes de cruzar.
        </p>
      </div>
    </div>
  );
};

export default MasTramites;
