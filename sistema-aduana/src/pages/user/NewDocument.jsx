import { useState } from 'react';

const NewDocument = () => {
  const [formData, setFormData] = useState({ tipo: '', detalle: '' });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Trámite enviado:\nTipo: ${formData.tipo}\nDetalle: ${formData.detalle}`);
    setFormData({ tipo: '', detalle: '' });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Nueva declaración/documentación</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Tipo de trámite:
          <input
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Ej: Importación"
          />
        </label>
        <label>
          Detalle:
          <textarea
            name="detalle"
            value={formData.detalle}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="Describa su trámite..."
          />
        </label>
        <button
          type="submit"
          className="self-start bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          Enviar trámite
        </button>
      </form>
    </div>
  );
};

export default NewDocument;