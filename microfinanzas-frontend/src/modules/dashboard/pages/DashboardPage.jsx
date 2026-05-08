import React, { useEffect, useState } from 'react';
import { prestamoService } from '../../prestamos/services/prestamoService';
import { PrestamosTabla } from '../../prestamos/components/PrestamosTabla';
import { Wallet, Users, TrendingUp } from 'lucide-react';

export const DashboardPage = () => {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({ total: 0, cantidad: 0 });

    useEffect(() => {
        const cargarDashboard = async () => {
            try {
                const prestamos = await prestamoService.listarActivos();
                setData(prestamos);
                const suma = prestamos.reduce((acc, curr) => acc + curr.monto, 0);
                setStats({ total: suma, cantidad: prestamos.length });
            } catch (err) {
                console.error("Error al conectar con Spring Boot");
            }
        };
        cargarDashboard();
    }, []);

    return (
        <div className="p-8 bg-slate-50 min-h-screen">
            <h1 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tight">
                Sistema de Microfinanzas
            </h1>

            {/* Widgets de Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={<Wallet/>} label="Capital Prestado" value={`S/ ${stats.total.toFixed(2)}`} color="blue" />
                <StatCard icon={<Users/>} label="Clientes Activos" value={stats.cantidad} color="green" />
                <StatCard icon={<TrendingUp/>} label="Interés Promedio" value="5.2%" color="indigo" />
            </div>

            <h2 className="text-lg font-bold text-slate-700 mb-4 flex items-center gap-2">
                Últimos Préstamos Registrados
            </h2>
            <PrestamosTabla prestamos={data} onVerCuotas={(p) => alert(`Viendo cuotas de ${p.id}`)} />
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border-b-4 border-${color}-500`}>
        <div className="flex items-center gap-4">
            <div className={`p-3 bg-${color}-50 text-${color}-600 rounded-xl`}>{icon}</div>
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase">{label}</p>
                <p className="text-2xl font-black text-slate-800">{value}</p>
            </div>
        </div>
    </div>
);