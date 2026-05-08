import React, { useState, useEffect } from 'react';
import api from '../../../api/axiosConfig';
import { riesgoService } from '../services/riesgoService';
import { ReporteCard } from '../components/ReporteCard';
import { Cpu, Loader2 } from 'lucide-react';

export const AnalisisRiesgo = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [reporte, setReporte] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cargandoClientes, setCargandoClientes] = useState(true);

    // Cargar la lista de clientes al abrir la página
    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes');
                setClientes(response.data);
            } catch (error) {
                console.error("Error al cargar clientes", error);
            } finally {
                setCargandoClientes(false);
            }
        };
        fetchClientes();
    }, []);

    // Función que se ejecuta al darle clic al botón
    const handleEvaluar = async () => {
        if (!selectedId) return;
        setLoading(true);
        setReporte(null); // Limpiamos el reporte anterior
        try {
            const data = await riesgoService.evaluarCliente(selectedId);
            setReporte(data);
        } catch (error) {
            console.error("Error al evaluar riesgo:", error);
            alert("Hubo un error al conectar con el motor de riesgo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            {/* Título de la sección */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">Análisis de Riesgo Crediticio</h1>
                <p className="text-sm text-slate-500">Evaluación algorítmica y detección de anomalías por IA.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* PANEL IZQUIERDO: Formulario de Selección */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
                        <div className="mb-6 flex items-center gap-3 text-indigo-900">
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <Cpu size={24} className="text-indigo-600" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold">Motor de Decisión</h2>
                                <p className="text-xs text-slate-500">Selecciona un perfil a evaluar</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Cliente Registrado</label>
                                <select 
                                    value={selectedId} 
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm bg-slate-50"
                                    disabled={cargandoClientes || loading}
                                >
                                    <option value="">-- Seleccionar Cliente --</option>
                                    {clientes.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.nombres} {c.apellidos} ({c.dni})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button 
                                onClick={handleEvaluar}
                                disabled={!selectedId || loading}
                                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-white transition-all ${
                                    !selectedId || loading 
                                    ? 'bg-slate-300 cursor-not-allowed' 
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'
                                }`}
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Cpu size={18} />}
                                {loading ? 'Procesando Variables...' : 'Ejecutar Evaluación'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* PANEL DERECHO: Mostrar el Reporte o Mensaje de espera */}
                <div className="lg:col-span-2">
                    {reporte ? (
                        <ReporteCard reporte={reporte} />
                    ) : (
                        <div className="h-full border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 min-h-[400px]">
                            <Cpu size={48} className="mb-4 text-slate-300 opacity-50" />
                            <p className="font-medium">Selecciona un cliente y ejecuta la evaluación</p>
                            <p className="text-xs mt-1">El reporte aparecerá aquí</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};