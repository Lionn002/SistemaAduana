// src/pages/user/StatusCheck.jsx
import { useState } from 'react';

const StatusCheck = () => {
  const [folio, setFolio] = useState('');
  const [estado, setEstado] = useState(null);

  const handleCheck = () => {
    const opciones = ['En proceso', 'Aprobado', 'Rechazado', 'Pendiente'];
    setEstado(opciones[Math.floor(Math.random() * opciones.length)]);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Consultar estado de trámite</h2>
      <div className="flex gap-4 items-center">
        <input
          className="border px-3 py-2 rounded"
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
        <p className="mt-4">
          Estado del trámite {folio}: <strong>{estado}</strong>
        </p>
      )}
    </div>
  );
};

export default StatusCheck;
