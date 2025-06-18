// Directorio: src/components
// Tipo: React Component
// Nombre: RegistroVehiculo.jsx

import { useState, useEffect } from 'react';
import { users } from '../data/users';

const RegistroVehiculo = () => {
  // Campos del formulario
  const [patente, setPatente] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [anio, setAnio] = useState('');
  const [rutConductor, setRutConductor] = useState('');

  // Errores de validación
  const [errors, setErrors] = useState({});

  // Lista de vehículos almacenados
  const [vehicles, setVehicles] = useState([]);

  // Cargar vehículos desde localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('vehicles') || '[]');
    setVehicles(saved);
  }, []);

  // Validaciones
  const validatePatente = (val) => /^[A-Z0-9]{6,7}$/.test(val);
  const validateAnio = (val) => /^\d{4}$/.test(val) && Number(val) >= 1900 && Number(val) <= new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Patente
    if (!patente.trim()) newErrors.patente = 'La patente es obligatoria';
    else if (!validatePatente(patente.trim())) newErrors.patente = 'Patente inválida (6-7 caracteres alfanuméricos)';
    else if (vehicles.some(v => v.patente === patente.trim())) newErrors.patente = 'Patente ya registrada';

    // Marca y modelo
    if (!marca.trim()) newErrors.marca = 'La marca es obligatoria';
    if (!modelo.trim()) newErrors.modelo = 'El modelo es obligatorio';

    // Año
    if (!anio.trim()) newErrors.anio = 'El año es obligatorio';
    else if (!validateAnio(anio.trim())) newErrors.anio = `Año inválido (1900–${new Date().getFullYear()})`;

    // RUT conductor
    if (!rutConductor.trim()) newErrors.rutConductor = 'El RUT del conductor es obligatorio';
    else if (!users.some(u => u.rut === rutConductor.trim())) newErrors.rutConductor = 'No existe un conductor con ese RUT';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Guardar vehículo
    const newVehicle = { patente: patente.trim(), marca: marca.trim(), modelo: modelo.trim(), anio: anio.trim(), rutConductor: rutConductor.trim() };
    const updated = [...vehicles, newVehicle];
    localStorage.setItem('vehicles', JSON.stringify(updated));
    setVehicles(updated);

    // Reset form
    setPatente(''); setMarca(''); setModelo(''); setAnio(''); setRutConductor('');
    setErrors({});
    alert('Vehículo registrado correctamente');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Registrar Vehículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Patente</label>
          <input
            type="text"
            value={patente}
            onChange={e => setPatente(e.target.value.toUpperCase())}
            placeholder="ABC1234"
            className="w-full border rounded px-3 py-2"
          />
          {errors.patente && <p className="text-red-500 text-sm">{errors.patente}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Marca</label>
          <input
            type="text"
            value={marca}
            onChange={e => setMarca(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.marca && <p className="text-red-500 text-sm">{errors.marca}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Modelo</label>
          <input
            type="text"
            value={modelo}
            onChange={e => setModelo(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          {errors.modelo && <p className="text-red-500 text-sm">{errors.modelo}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Año</label>
          <input
            type="text"
            value={anio}
            onChange={e => setAnio(e.target.value)}
            placeholder="2023"
            className="w-full border rounded px-3 py-2"
          />
          {errors.anio && <p className="text-red-500 text-sm">{errors.anio}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">RUT del Conductor</label>
          <input
            type="text"
            value={rutConductor}
            onChange={e => setRutConductor(e.target.value)}
            placeholder="12345678-9"
            className="w-full border rounded px-3 py-2"
          />
          {errors.rutConductor && <p className="text-red-500 text-sm">{errors.rutConductor}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/90 transition"
        >
          Registrar Vehículo
        </button>
      </form>
    </div>
  );
};

export default RegistroVehiculo;
