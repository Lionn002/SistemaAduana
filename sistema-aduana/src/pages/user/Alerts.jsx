import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    setAlerts([
      { id: 1, fecha: '2025-06-01', mensaje: 'Trámite #123456 aprobado' },
      { id: 2, fecha: '2025-06-02', mensaje: 'Documentación adicional requerida para #654321' },
      { id: 3, fecha: '2025-06-03', mensaje: 'Trámite #789012 rechazado por falta de datos' },
      { id: 4, fecha: '2025-06-04', mensaje: 'Ingreso de vehículo #VHL-001 registrado' },
      { id: 5, fecha: '2025-06-05', mensaje: 'Declaración de alimentos #ALM-009 aprobada' },
      { id: 6, fecha: '2025-06-06', mensaje: 'Correo de confirmación enviado' },
      { id: 7, fecha: '2025-06-07', mensaje: 'Nuevo formulario disponible en plataforma' },
      { id: 8, fecha: '2025-06-08', mensaje: 'Trámite #111222 fue asignado a revisión' },
      { id: 9, fecha: '2025-06-09', mensaje: 'Recordatorio: Declaración pendiente' },
      { id: 10, fecha: '2025-06-10', mensaje: 'Cambio de estado: Trámite #135790 en proceso' },
      { id: 11, fecha: '2025-06-11', mensaje: 'Historial actualizado correctamente' },
      { id: 12, fecha: '2025-06-12', mensaje: 'Trámite #246810 aprobado sin observaciones' },
      { id: 13, fecha: '2025-06-13', mensaje: 'Ingreso detectado desde nueva IP' },
      { id: 14, fecha: '2025-06-14', mensaje: 'Adjunto pendiente en trámite #555666' },
      { id: 15, fecha: '2025-06-15', mensaje: 'Verificación de identidad completada' },
      { id: 16, fecha: '2025-06-16', mensaje: 'Error en declaración corregido automáticamente' },
      { id: 17, fecha: '2025-06-17', mensaje: 'Nuevo documento agregado a tu expediente' },
      { id: 18, fecha: '2025-06-18', mensaje: 'Plazo extendido para trámite #888999' },
      { id: 19, fecha: '2025-06-19', mensaje: 'Actualización de datos personales realizada' },
      { id: 20, fecha: '2025-06-20', mensaje: 'Atención: Falta completar declaración jurada' },
      { id: 21, fecha: '2025-06-21', mensaje: 'Nuevo mensaje del equipo de soporte' },
      { id: 22, fecha: '2025-06-22', mensaje: 'Revisión secundaria iniciada en #223344' },
      { id: 23, fecha: '2025-06-23', mensaje: 'Vehículo #TX-999 ha sido inspeccionado' },
      { id: 24, fecha: '2025-06-24', mensaje: 'Registro de carga actualizado' },
      { id: 25, fecha: '2025-06-25', mensaje: 'Notificación de aduana sobre carga internacional' },
      { id: 26, fecha: '2025-06-26', mensaje: 'Se ha programado una cita de revisión' },
      { id: 27, fecha: '2025-06-27', mensaje: 'Formulario COVID-19 obligatorio actualizado' },
      { id: 28, fecha: '2025-06-28', mensaje: 'Resultado de revisión: Sin observaciones' },
      { id: 29, fecha: '2025-06-29', mensaje: 'Trámite duplicado detectado y fusionado' },
      { id: 30, fecha: '2025-06-30', mensaje: 'Estado final: Trámite #999888 completado' },
      { id: 31, fecha: '2025-07-01', mensaje: 'Inspección aleatoria agendada para mañana' },
      { id: 32, fecha: '2025-07-02', mensaje: 'Nuevo punto de ingreso habilitado' },
      { id: 33, fecha: '2025-07-03', mensaje: 'Actualización de protocolo de ingreso' },
      { id: 34, fecha: '2025-07-04', mensaje: 'Respuesta enviada a tu solicitud #SR-001' },
      { id: 35, fecha: '2025-07-05', mensaje: 'Documento rechazado por formato incorrecto' },
      { id: 36, fecha: '2025-07-06', mensaje: 'Trámite #111333 revisado por Aduana' },
      { id: 37, fecha: '2025-07-07', mensaje: 'Acceso temporal concedido por resolución especial' },
      { id: 38, fecha: '2025-07-08', mensaje: 'Sistema disponible nuevamente para declarar' },
      { id: 39, fecha: '2025-07-09', mensaje: 'Se detectó error en RUT, por favor verificar' },
      { id: 40, fecha: '2025-07-10', mensaje: 'Historial actualizado con nueva entrada' }
    ]);
  }, []);


  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow-md">
      <div className="flex items-center gap-2 mb-4 text-primary dark:text-white">
        <Bell className="w-6 h-6" />
        <h2 className="text-2xl font-semibold">Alertas / Notificaciones</h2>
      </div>
      <ul className="space-y-3">
        {alerts.map(a => (
          <li key={a.id} className="border-b pb-3 text-gray-800 dark:text-gray-200">
            <span className="font-semibold">{a.fecha}:</span> {a.mensaje}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
