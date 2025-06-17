// src/components/Modal.jsx
import React from 'react';
export default function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        {children}
      </div>
      <button
        className="absolute top-4 right-4 text-white"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
        ✕
      </button>
    </div>
  );
}
