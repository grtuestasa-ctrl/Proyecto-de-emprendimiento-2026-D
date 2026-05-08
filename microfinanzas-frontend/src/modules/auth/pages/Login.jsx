import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Lock, User } from 'lucide-react';
import { AuthContext } from '../../../context/AuthContext';
import api from '../../../api/axiosConfig';

export const Login = () => {
    // Configuramos React Hook Form para manejar los inputs fácilmente
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    // Traemos la función 'login' de nuestro contexto global
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    
    // Estados para manejar la carga y los errores visuales
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Esta función se ejecuta cuando el usuario le da al botón "Iniciar Sesión"
    const onSubmit = async (data) => {
        setIsLoading(true);
        setAuthError('');
        
        try {
            // 1. Petición POST real a tu backend en Spring Boot
            const response = await api.post('/auth/login', data);
            
            // 2. Extraemos el token del JSON que nos devuelve Java (JwtAuthResponseDTO)
            const token = response.data.token;
            
            // 3. Guardamos el token usando nuestra función del Contexto
            login(token);
            
            // 4. Redirigimos al usuario al Dashboard principal
            navigate('/');

        } catch (error) {
            // Manejo profesional de errores HTTP
            if (error.response && error.response.status === 401) {
                setAuthError('Usuario o contraseña incorrectos. Verifica tus credenciales.');
            } else if (error.response && error.response.status === 403) {
                setAuthError('Acceso denegado.');
            } else {
                setAuthError('Error de conexión. ¿Está encendido el servidor Spring Boot?');
                console.error("Detalle del error:", error);
            }
        } finally {
            // Quitamos el estado de carga sin importar si hubo éxito o error
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-blue-900">Microfinanzas</h1>
                    <p className="text-slate-500 mt-2">Ingresa tus credenciales para continuar</p>
                </div>

                {/* Caja de alerta para errores (se muestra solo si authError tiene texto) */}
                {authError && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p className="text-sm font-medium">{authError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Input de Usuario */}
                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Usuario</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                {...register("username", { required: "El usuario es obligatorio" })}
                                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="admin"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.username && <span className="text-red-500 text-xs mt-1 block">{errors.username.message}</span>}
                    </div>

                    {/* Input de Contraseña */}
                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Contraseña</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                {...register("password", { required: "La contraseña es obligatoria" })}
                                className="w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                                placeholder="••••••••"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.password && <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>}
                    </div>

                    {/* Botón de Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 ${isLoading ? 'opacity-70 cursor-not-allowed transform-none' : ''}`}
                    >
                        {isLoading ? 'Conectando con el servidor...' : 'Iniciar Sesión'}
                    </button>
                </form>
            </div>
        </div>
    );
};