import { useState } from 'react';

const StatusCheck = () => {
  const [folio, setFolio] = useState('');
  const [estado, setEstado] = useState(null);

  const handleCheck = () => {
    const opciones = ['En proceso', 'Aprobado', 'Rechazado', 'Pendiente'];
    setEstado(opciones[Math.floor(Math.random() * opciones.length)]);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded shadow-md max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        Consultar estado de trámite
      </h2>
      <div className="flex gap-4 items-center">
        <input
          className="flex-1 border px-3 py-2 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Número de trámite"
          value={folio}
          onChange={e => setFolio(e.target.value)}
        />
        <button
          onClick={handleCheck}
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Consultar
        </button>
      </div>
      {estado && (
        <p className="mt-4 text-gray-800 dark:text-gray-200">
          Estado del trámite <strong>{folio}</strong>: {estado}
        </p>
      )}
    </div>
  );
};

export default StatusCheck;
