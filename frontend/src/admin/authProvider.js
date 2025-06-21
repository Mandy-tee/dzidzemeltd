import { apiClient } from "../api/client";

export const authProvider = {
    async login({ username: email, password }) {
        try {
            const response = await apiClient.post('/users/login', { email, password });
            localStorage.setItem('RA_AUTH_TOKEN', response.data.accessToken);
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async checkError(error) {
        const status = error.status;
        if (status === 401) {
            localStorage.removeItem('RA_AUTH_TOKEN');
            throw new Error('Session expired!');
        }
        // other error codes (404, 500, etc): no need to log out
    },
    async checkAuth() {
        try {
            // Get access token
            const token = localStorage.getItem('RA_AUTH_TOKEN');
            // Check if token exists
            if (!token) {
                throw new Error('Unauthorized!');
            }
            // Get user profile
            const response = await apiClient.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Check if user has permission
            const { role } = response.data;
            if (!['superadmin', 'admin'].includes(role)) {
                throw new Error('Access denied!');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    },
    async logout() {
        localStorage.removeItem('RA_AUTH_TOKEN');
    },
    async getIdentity() {
        try {
            // Get access token
            const token = localStorage.getItem('RA_AUTH_TOKEN');
            // Get user profile
            const response = await apiClient.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // Return user identity
            const { id, name: fullName } = response.data;
            return { id, fullName };
        } catch (error) {
            throw new Error(error.message);
        }
    },
};