import api from '../../../api/axiosConfig';

export const prestamoService = {
    // Obtener lista para la tabla
    listarActivos: async () => {
        const { data } = await api.get('/prestamos');
        return data;
    },

    // Crear préstamo (esto dispara la generación de cuotas en Spring Boot)
    crear: async (payload) => {
        // Aquí se corrigió de api.get a api.post
        const { data } = await api.post('/prestamos', payload);
        return data;
    },

    // Obtener el cronograma de cuotas de un préstamo específico
    obtenerCronograma: async (prestamoId) => {
        const { data } = await api.get(`/prestamos/${prestamoId}/cuotas`);
        return data;
    }
};