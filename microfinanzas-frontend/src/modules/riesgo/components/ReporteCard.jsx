import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ReporteCard = ({ reporte }) => {
    // Función para asignar colores según el nivel de riesgo
    const getRiskColor = (nivel) => {
        switch(nivel) {
            case 'BAJO': return 'text-emerald-700 bg-emerald-100';
            case 'MEDIO': return 'text-amber-700 bg-amber-100';
            case 'ALTO': return 'text-orange-700 bg-orange-100';
            case 'CRITICO': return 'text-rose-700 bg-rose-100';
            default: return 'text-slate-700 bg-slate-100';
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
            {/* Cabecera del Reporte */}
            <div className={`p-6 border-b flex items-center justify-between ${reporte.aprobado ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                <div className="flex items-center gap-4">
                    {reporte.aprobado 
                        ? <CheckCircle className="text-emerald-600" size={36} /> 
                        : <XCircle className="text-rose-600" size={36} />
                    }
                    <div>
                        <h3 className={`text-xl font-black ${reporte.aprobado ? 'text-emerald-900' : 'text-rose-900'}`}>
                            {reporte.aprobado ? 'CRÉDITO PRE-APROBADO' : 'CRÉDITO DENEGADO'}
                        </h3>
                        <p className={`text-sm font-medium ${reporte.aprobado ? 'text-emerald-700' : 'text-rose-700'}`}>
                            DNI Evaluado: {reporte.dni}
                        </p>
                    </div>
                </div>
                <div className="text-right bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Score Final</p>
                    <p className="text-3xl font-black text-slate-800 leading-none">{reporte.scoreFinal}</p>
                </div>
            </div>
            
            {/* Detalles y Variables */}
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col justify-center items-start">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Nivel de Riesgo</p>
                        <span className={`inline-flex px-3 py-1 rounded-md text-sm font-black tracking-wide ${getRiskColor(reporte.nivelRiesgo)}`}>
                            {reporte.nivelRiesgo}
                        </span>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">Detección de Fraude (IA)</p>
                        <div className="flex items-center gap-2 mt-1">
                            {reporte.anomaliaDetectada ? (
                                <><AlertTriangle size={20} className="text-rose-500" /> <span className="font-bold text-rose-700">Anomalía Detectada</span></>
                            ) : (
                                <><ShieldCheck size={20} className="text-emerald-500" /> <span className="font-bold text-emerald-700">Perfil Limpio</span></>
                            )}
                        </div>
                    </div>
                </div>

                {/* Lista de Observaciones */}
                <div>
                    <p className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wider">Registro de Observaciones</p>
                    {reporte.observaciones && reporte.observaciones.length > 0 ? (
                        <ul className="space-y-2">
                            {reporte.observaciones.map((obs, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-amber-50/50 border border-amber-100 p-3 rounded-lg">
                                    <AlertTriangle size={18} className="text-amber-500 shrink-0" />
                                    <span className="font-medium">{obs}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg text-center">
                            <p className="text-sm text-slate-500 font-medium">No se encontraron observaciones negativas. El perfil cumple con las políticas.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};