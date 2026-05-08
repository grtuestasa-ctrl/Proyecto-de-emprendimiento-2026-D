import React from 'react';
import { CalendarDays, ChevronRight } from 'lucide-react';

export const PrestamosTabla = ({ prestamos, onVerCuotas }) => {
  if (!prestamos || prestamos.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        No se encontraron préstamos registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-b-xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
          <tr>
            <th className="py-3 px-6">ID</th>
            <th className="py-3 px-6">Cliente</th>
            <th className="py-3 px-6">Monto</th>
            <th className="py-3 px-6">Condiciones</th>
            <th className="py-3 px-6">Estado</th>
            <th className="py-3 px-6 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {prestamos.map((prestamo) => (
            <tr key={prestamo.id} className="hover:bg-slate-50 transition-colors">
              <td className="py-3 px-6 font-medium text-slate-400">#{prestamo.id}</td>
              <td className="py-3 px-6">
                <div className="font-medium text-slate-900">{prestamo.cliente?.nombres} {prestamo.cliente?.apellidos}</div>
                <div className="text-xs text-slate-500">DNI: {prestamo.cliente?.dni}</div>
              </td>
              <td className="py-3 px-6 font-bold text-slate-900">
                S/ {prestamo.monto?.toLocaleString('es-PE', { minimumFractionDigits: 2 })}
              </td>
              <td className="py-3 px-6">
                <div className="text-slate-900">{prestamo.plazoMeses} meses</div>
                <div className="text-xs text-slate-500">Tasa: {prestamo.tasaInteres}%</div>
              </td>
              <td className="py-3 px-6">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  prestamo.estado === 'ACTIVO' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : prestamo.estado === 'FINALIZADO'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-rose-100 text-rose-700'
                }`}>
                  {prestamo.estado}
                </span>
              </td>
              <td className="py-3 px-6 text-right">
                <button 
                  onClick={() => onVerCuotas(prestamo)}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <CalendarDays size={14} />
                  Cronograma
                  <ChevronRight size={14} className="ml-1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};