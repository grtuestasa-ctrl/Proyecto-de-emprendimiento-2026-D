import React, { useEffect, useState } from 'react';
import { prestamoService } from '../services/prestamoService';
import { PrestamosTabla } from '../components/PrestamosTabla';
import { Search, Plus, Loader2 } from 'lucide-react';

export const PrestamosLista = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrestamos = async () => {
      try {
        const data = await prestamoService.listarActivos();
        setPrestamos(data);
      } catch (error) {
        console.error("Error al cargar los préstamos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrestamos();
  }, []);

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      {/* Header del Módulo */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Préstamos</h1>
          <p className="text-sm text-slate-500">Administra los créditos otorgados y visualiza cronogramas.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm">
          <Plus size={18} />
          Nuevo Préstamo
        </button>
      </div>

      {/* Barra de Herramientas (Filtros y Búsqueda) */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0 flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por cliente o DNI..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Tabla Profesional o Estado de Carga */}
      <div className="bg-white border border-slate-200 rounded-b-xl shadow-sm flex-1">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <Loader2 className="animate-spin" size={32} />
              <p className="text-sm font-medium">Sincronizando préstamos...</p>
           </div>
        ) : (
           <PrestamosTabla 
              prestamos={prestamos} 
              onVerCuotas={(p) => alert(`Próximamente: Modal del cronograma para el préstamo #${p.id}`)} 
           />
        )}
      </div>
    </div>
  );
};