import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';

// Importación de Módulos
import { Login } from '../modules/auth/pages/Login';
import { DashboardPage } from '../modules/dashboard/pages/DashboardPage';
import { ClientesLista } from '../modules/cliente/pages/ClientesLista';
import { PrestamosLista } from '../modules/prestamo/pages/PrestamosLista';
import { AnalisisRiesgo } from '../modules/riesgo/pages/AnalisisRiesgo';

/**
 * Componente para proteger rutas privadas.
 * Verifica si el usuario está autenticado; de lo contrario, lo redirige al Login.
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    // Mientras se verifica el estado de autenticación, mostramos un indicador de carga
    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
        );
    }
    
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. RUTA PÚBLICA: Pantalla de Inicio de Sesión */}
                <Route path="/login" element={<Login />} />

                {/* 2. RUTAS PRIVADAS: Protegidas y envueltas en el diseño principal (MainLayout) */}
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <Routes>
                                    {/* Dashboard / Resumen General */}
                                    <Route path="/" element={<DashboardPage />} />
                                    
                                    {/* Módulo de Clientes */}
                                    <Route path="/clientes" element={<ClientesLista />} />
                                    
                                    {/* Módulo de Préstamos */}
                                    <Route path="/prestamos" element={<PrestamosLista />} />
                                    
                                    {/* Módulo de Análisis de Riesgo (IA) */}
                                    <Route path="/riesgo" element={<AnalisisRiesgo />} />

                                    {/* Módulo de Transacciones (Placeholder) */}
                                    <Route 
                                        path="/pagos" 
                                        element={
                                            <div className="p-8 bg-white rounded-xl border border-slate-200 text-center">
                                                <h2 className="text-xl font-bold text-slate-800">Módulo de Transacciones</h2>
                                                <p className="text-slate-500">Este módulo está actualmente en desarrollo.</p>
                                            </div>
                                        } 
                                    />
                                    
                                    {/* Redirección automática al Dashboard para cualquier ruta no definida */}
                                    <Route path="*" element={<Navigate to="/" replace />} />
                                </Routes>
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};