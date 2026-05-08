import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { MainLayout } from '../components/layout/MainLayout';

// Importación de Páginas
import { Login } from '../modules/auth/pages/Login';

// Componentes temporales (Placeholders) hasta que creemos los archivos reales
const Dashboard = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800">Panel General</h1>
        <p className="text-slate-500 mt-1">Bienvenido al sistema de gestión de microfinanzas Wayra.</p>
    </div>
);

const Clientes = () => <div className="text-2xl font-bold">Gestión de Clientes</div>;
const Prestamos = () => <div className="text-2xl font-bold">Módulo de Préstamos</div>;
const Pagos = () => <div className="text-2xl font-bold">Registro de Transacciones</div>;
const Riesgo = () => <div className="text-2xl font-bold">Análisis de Riesgo con IA</div>;

/**
 * HOC (Higher Order Component) para proteger rutas.
 * Si el usuario no tiene token, lo rebota al login.
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
            </div>
        );
    }
    
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 1. RUTA PÚBLICA: Login */}
                <Route path="/login" element={<Login />} />

                {/* 2. RUTAS PRIVADAS: Envueltas en el Layout y Protección */}
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/clientes" element={<Clientes />} />
                                    <Route path="/prestamos" element={<Prestamos />} />
                                    <Route path="/pagos" element={<Pagos />} />
                                    <Route path="/riesgo" element={<Riesgo />} />
                                    
                                    {/* Redirección interna si la sub-ruta no existe */}
                                    <Route path="*" element={<Navigate to="/" />} />
                                </Routes>
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};