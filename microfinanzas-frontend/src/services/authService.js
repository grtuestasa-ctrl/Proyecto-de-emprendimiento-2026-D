import api from '../config/api';

export const login = async (username, password) => {
    try {
        const response = await api.post('/auth/login', {
            username: username,
            password: password
        });
        
        // Guardamos el token en el almacenamiento local del navegador
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        return true;
    } catch (error) {
        console.error("Error al iniciar sesión:", error.response?.data || error.message);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};