// src/services/clienteService.js
import api from '../api/axiosConfig';

export const obtenerClientes = async () => {
    try {
        // No necesitas enviar el token aquí, el interceptor de api.js lo hace por ti
        const response = await api.get('/clientes');
        return response.data;
    } catch (error) {
        console.error("Error al obtener clientes:", error);
        throw error;
    }
};