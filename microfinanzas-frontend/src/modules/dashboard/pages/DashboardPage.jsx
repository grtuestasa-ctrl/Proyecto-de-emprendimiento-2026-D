import React, { useEffect, useState } from 'react';
import { prestamoService } from '../../prestamo/services/prestamoService';
import { PrestamosTabla } from '../../prestamo/components/PrestamosTabla';
import { Wallet, Users, TrendingUp, ArrowUpRight, Loader2 } from 'lucide-react';

export const DashboardPage = () => {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({ total: 0, cantidad: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDashboard = async () => {
            try {
                // Se corrigió el import a ../../prestamo/
                const prestamos = await prestamoService.listarActivos();
                setData(prestamos);
                
                const suma = prestamos.reduce((acc, curr) => acc + curr.monto, 0);
                setStats({ total: suma, cantidad: prestamos.length });
            } catch (err) {
                console.error("Error al conectar con el servidor backend:", err);
            } finally {
                setLoading(false);
            }
        };
        cargarDashboard();
    }, []);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Cabecera de Bienvenida */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Resumen General</h1>
                <p className="text-slate-500 text-sm">Visualización en tiempo real de la cartera de microfinanzas.</p>
            </div>

            {/* Widgets de Estadísticas Modernos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    icon={<Wallet className="text-blue-600" size={24} />} 
                    label="Capital Prestado" 
                    value={`S/ ${stats.total.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`}
                    trend="+5.4% este mes"
                    bgColor="bg-blue-50"
                />
                <StatCard 
                    icon={<Users className="text-emerald-600" size={24} />} 
                    label="Clientes Activos" 
                    value={stats.cantidad}
                    trend="+2 nuevos hoy"
                    bgColor="bg-emerald-50"
                />
                <StatCard 
                    icon={<TrendingUp className="text-indigo-600" size={24} />} 
                    label="Interés Promedio" 
                    value="5.2%" 
                    trend="Tasa estable"
                    bgColor="bg-indigo-50"
                />
            </div>

            {/* Sección de Tabla con Contenedor Profesional */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-800">Últimos Préstamos Registrados</h2>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 flex items-center gap-1 transition-colors">
                        Ver todos los registros <ArrowUpRight size={16} />
                    </button>
                </div>
                
                <div className="p-0">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Loader2 className="animate-spin" size={32} />
                            <p className="text-sm font-medium">Sincronizando con el servidor...</p>
                        </div>
                    ) : (
                        <PrestamosTabla 
                            prestamos={data} 
                            onVerCuotas={(p) => alert(`Consultando detalles del préstamo #${p.id}`)} 
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente Interno para las Tarjetas de Estadísticas
const StatCard = ({ icon, label, value, trend, bgColor }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 ${bgColor} rounded-lg transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase tracking-wider">
                Global
            </span>
        </div>
        <div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
            <h3 className="text-2xl font-black text-slate-900">{value}</h3>
            <div className="flex items-center gap-1 mt-2">
                <span className="text-xs font-semibold text-emerald-600">{trend}</span>
            </div>
        </div>
    </div>
);