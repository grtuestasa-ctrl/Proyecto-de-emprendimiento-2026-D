import api from '../../../api/axiosConfig';

export const riesgoService = {
    // Llama al endpoint de tu backend: /api/v1/riesgo/evaluar/{clienteId}
    evaluarCliente: async (clienteId) => {
        const { data } = await api.get(`/riesgo/evaluar/${clienteId}`);
        return data;
    }
};