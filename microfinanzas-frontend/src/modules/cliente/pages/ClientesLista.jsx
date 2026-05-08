import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';

export const ClientesLista = () => {
  // Datos de prueba (luego los reemplazaremos con clienteService)
  const [clientes] = useState([
    { id: 1, nombre: 'Carlos Mendoza', dni: '72345678', telefono: '987654321', estado: 'Activo' },
    { id: 2, nombre: 'Ana Lucía Soto', dni: '78541236', telefono: '912345678', estado: 'Al día' },
    { id: 3, nombre: 'Roberto Carlos', dni: '74125896', telefono: '998877665', estado: 'En mora' },
  ]);

  return (
    <div className="flex flex-col h-full">
      {/* Header del Módulo */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Gestión de Clientes</h1>
          <p className="text-sm text-slate-500">Administra el portafolio de clientes y su información.</p>
        </div>
        <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg transition-colors font-medium text-sm shadow-sm">
          <Plus size={18} />
          Nuevo Cliente
        </button>
      </div>

      {/* Barra de Herramientas (Filtros y Búsqueda) */}
      <div className="bg-white p-4 rounded-t-xl border border-slate-200 border-b-0 flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nombre o DNI..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Tabla Profesional */}
      <div className="bg-white border border-slate-200 rounded-b-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
            <tr>
              <th className="py-3 px-6">Cliente</th>
              <th className="py-3 px-6">DNI</th>
              <th className="py-3 px-6">Teléfono</th>
              <th className="py-3 px-6">Estado</th>
              <th className="py-3 px-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-6 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    {cliente.nombre.charAt(0)}
                  </div>
                  {cliente.nombre}
                </td>
                <td className="py-3 px-6">{cliente.dni}</td>
                <td className="py-3 px-6">{cliente.telefono}</td>
                <td className="py-3 px-6">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    cliente.estado === 'Activo' || cliente.estado === 'Al día' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {cliente.estado}
                  </span>
                </td>
                <td className="py-3 px-6 text-right flex justify-end gap-2">
                  <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};