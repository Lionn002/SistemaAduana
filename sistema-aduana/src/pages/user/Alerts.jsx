import { useEffect, useState } from 'react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts([
      { id: 1, fecha: '2025-06-01', mensaje: 'Trámite #123456 aprobado' },
      { id: 2, fecha: '2025-06-05', mensaje: 'Documentación adicional requerida #654321' },
      { id: 3, fecha: '2025-06-10', mensaje: 'Trámite #789012 rechazado' },
    ]);
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Alertas / Notificaciones</h2>
      <ul className="space-y-2">
        {alerts.map(a => (
          <li key={a.id} className="border-b pb-2">
            <span className="font-medium">{a.fecha}:</span> {a.mensaje}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
