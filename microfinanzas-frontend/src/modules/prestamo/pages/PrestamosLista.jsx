import React, { useEffect, useState } from 'react';
import api from '../../../api/axiosConfig';
import { Eye, DollarSign, Calendar, User } from 'lucide-react';

export const PrestamosLista = () => {
    const [prestamos, setPrestamos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPrestamos();
    }, []);

    const fetchPrestamos = async () => {
        try {
            const response = await api.get('/prestamos'); // Tu endpoint de Spring Boot
            setPrestamos(response.data);
        } catch (error) {
            console.error("Error cargando préstamos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-blue-900">Préstamos Activos</h2>
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                        Nuevo Préstamo
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-100 border-b border-slate-200">
                            <tr>
                                <th className="p-4 text-sm font-bold text-slate-600 uppercase">Cliente</th>
                                <th className="p-4 text-sm font-bold text-slate-600 uppercase text-center">Monto</th>
                                <th className="p-4 text-sm font-bold text-slate-600 uppercase text-center">Tasa %</th>
                                <th className="p-4 text-sm font-bold text-slate-600 uppercase text-center">Plazo</th>
                                <th className="p-4 text-sm font-bold text-slate-600 uppercase text-center">Estado</th>
                                <th className="p-4 text-sm font-bold text-slate-600 uppercase text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-slate-100">
                            {isLoading ? (
                                <tr><td colSpan="6" className="p-10 text-center text-slate-400">Cargando datos del servidor...</td></tr>
                            ) : prestamos.length === 0 ? (
                                <tr><td colSpan="6" className="p-10 text-center text-slate-400">No hay préstamos registrados.</td></tr>
                            ) : (
                                prestamos.map((p) => (
                                    <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 p-2 rounded-full text-blue-700">
                                                    <User size={18} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{p.cliente.nombres} {p.cliente.apellidos}</p>
                                                    <p className="text-xs text-slate-500">DNI: {p.cliente.dni}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center font-semibold text-slate-700">
                                            S/ {p.monto.toFixed(2)}
                                        </td>
                                        <td className="p-4 text-center text-slate-600">
                                            {p.tasaInteres}%
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-slate-700 font-medium">{p.plazoMeses} meses</span>
                                                <span className="text-[10px] text-slate-400 uppercase tracking-wider italic">Cronograma generado</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                p.estado === 'ACTIVO' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {p.estado}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-blue-600 hover:text-blue-800 p-2 transition-colors tooltip" title="Ver Cronograma">
                                                <Eye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};