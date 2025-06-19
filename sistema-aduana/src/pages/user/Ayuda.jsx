import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Ayuda() {
  const isDark = document.documentElement.classList.contains('dark');
  const navigate = useNavigate();

  const preguntas = [
    {
      q: '¿Qué documentos necesito para cruzar la frontera?',
      a: 'Cédula o pasaporte, formulario de declaración jurada y permisos requeridos según el tipo de producto.'
    },
    {
      q: '¿Qué se considera alimento restringido?',
      a: 'Productos perecibles como frutas, verduras, carnes o lácteos sin autorización SAG.'
    },
    {
      q: '¿Cómo sé si debo declarar algo?',
      a: 'Si transportas alimentos, plantas, mascotas, tecnología o dinero en efectivo superior a USD $10.000 debes declarar.'
    },
    {
      q: '¿Dónde puedo obtener ayuda durante el proceso?',
      a: 'Puedes acercarte al personal fronterizo, o visitar esta sección para resolver dudas frecuentes.'
    },
    {
      q: '¿Puedo guardar mi declaración para completarla luego?',
      a: 'Sí, si estás registrado, tus formularios en progreso se guardan automáticamente hasta que los completes.'
    }
  ];

  return (
    <div className="p-6 text-base lg:text-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary">Ayuda y Preguntas Frecuentes</h2>
      <div className={`p-6 rounded-lg space-y-4 ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
        {preguntas.map((item, index) => (
          <div key={index}>
            <strong className="block text-blue-500">{item.q}</strong>
            <p>{item.a}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/usuario/mas-tramites')}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Volver a Más Trámites
      </button>
    </div>
  );
}
