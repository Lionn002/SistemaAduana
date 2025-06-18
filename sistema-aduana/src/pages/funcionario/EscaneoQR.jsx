// src/pages/funcionario/EscaneoQR.jsx
import React, { useState } from 'react';
import { QrCode } from 'lucide-react';

export default function EscaneoQR() {
  const [simData, setSimData] = useState(null);

  const simulateScan = () => {
    setSimData({
      run: '12.345.678-9',
      nombre: 'María Ana López',
      fechaNacimiento: '1990-07-20'
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Escaneo de Cédula (QR)
      </h2>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-10 mb-4 bg-gray-50 dark:bg-gray-700">
        <QrCode className="w-16 h-16 text-gray-400 dark:text-gray-300 mb-2" />
        <p className="text-gray-500 dark:text-gray-400 mb-4">Aquí se simula el lector de QR</p>
        <button
          onClick={simulateScan}
          className="bg-secondary dark:bg-secondary/80 text-white px-4 py-2 rounded hover:bg-secondary/90 transition"
        >
          Escanear Cédula
        </button>
      </div>
      {simData && (
        <div className="bg-green-100 dark:bg-green-900 p-4 rounded text-gray-800 dark:text-gray-100">
          <h3 className="font-medium mb-2">Datos de la cédula:</h3>
          <p><strong>RUN:</strong> {simData.run}</p>
          <p><strong>Nombre:</strong> {simData.nombre}</p>
          <p><strong>Fecha de Nacimiento:</strong> {simData.fechaNacimiento}</p>
        </div>
      )}
    </div>
  );
}
