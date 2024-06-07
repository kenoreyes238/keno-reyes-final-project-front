import { BASE_URL } from './config';

const apiService = {
    
    login: async (email, password) => {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if(!response.ok) throw new Error("Sign in request failed");
        return response.json();
    },

    register: async (email, password) => {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) throw new Error("Registration request failed");
        return response.json();
    },
    
};

export default apiService;