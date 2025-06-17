import { useState } from 'react';

const DeclarationForm = () => {
  const [fields, setFields] = useState({ producto: '', origen: '', cantidad: '' });

  const handleChange = e => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Declaración jurada:\nProducto: ${fields.producto}\nOrigen: ${fields.origen}\nCantidad: ${fields.cantidad}`);
    setFields({ producto: '', origen: '', cantidad: '' });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Formulario de declaración jurada</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Producto:
          <input
            name="producto"
            value={fields.producto}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ej: Alimentos"
          />
        </label>
        <label>
          Origen:
          <input
            name="origen"
            value={fields.origen}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="País de origen"
          />
        </label>
        <label>
          Cantidad:
          <input
            name="cantidad"
            value={fields.cantidad}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Cantidad"
          />
        </label>
        <button
          type="submit"
          className="self-start bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Enviar declaración
        </button>
      </form>
    </div>
  );
};

export default DeclarationForm;
