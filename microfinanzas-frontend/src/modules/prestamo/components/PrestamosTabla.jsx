import React from 'react';
import { Eye, DollarSign, Calendar } from 'lucide-react';

export const PrestamosTabla = ({ prestamos, onVerCuotas }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Cliente</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase">Monto</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Cuotas</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase text-center">Estado</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {prestamos.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-4">
                                <p className="font-bold text-slate-800">{item.cliente.nombres} {item.cliente.apellidos}</p>
                                <p className="text-xs text-slate-500">DNI: {item.cliente.dni}</p>
                            </td>
                            <td className="p-4 font-mono font-bold text-blue-700">
                                S/ {item.monto.toFixed(2)}
                            </td>
                            <td className="p-4 text-center text-slate-600 font-medium">
                                {item.plazoMeses} meses
                            </td>
                            <td className="p-4 text-center">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                                    {item.estado}
                                </span>
                            </td>
                            <td className="p-4 text-right">
                                <button 
                                    onClick={() => onVerCuotas(item)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                >
                                    <Eye size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};