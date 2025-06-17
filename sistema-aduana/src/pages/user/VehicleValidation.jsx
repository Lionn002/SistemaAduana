import { useState } from 'react';

const VehicleValidation = () => {
  const [data, setData] = useState({ patente: '', chasis: '' });

  const handleChange = e => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Validación de vehículo:\nPatente: ${data.patente}\nChasis/VIN: ${data.chasis}`);
    setData({ patente: '', chasis: '' });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Registro y validación de vehículos</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Patente:
          <input
            name="patente"
            value={data.patente}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ej: AB123CD"
          />
        </label>
        <label>
          Chasis / VIN:
          <input
            name="chasis"
            value={data.chasis}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Número de chasis"
          />
        </label>
        <button
          type="submit"
          className="self-start bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Validar vehículo
        </button>
      </form>
    </div>
  );
};

export default VehicleValidation;
