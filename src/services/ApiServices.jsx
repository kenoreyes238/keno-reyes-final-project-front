import { BASE_URL } from './config';
import { getJwt } from './jwtService';

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

    fetchProducts: async () => {
        const response = await fetch(`${BASE_URL}/products`, {
            method: 'GET',
            credentials: 'include'
        });

        if(!response.ok) throw new Error('Fetching products failed');
        return response.json();
    },

    addProduct: async (name, price, quantity, amount) => {
        const response = await fetch(`${BASE_URL}/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwt()}`,
            },
            body: JSON.stringify({
                name,
                price,
                quantity,
                amount
            })
        });

        if(!response.ok) throw new Error('Adding product failed');
        return response.json();
    },

    deleteProduct: async (productId) => {
        const response = await fetch(`${BASE_URL}/deleteProduct/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwt()}`,
            }
        });

        if(!response.ok) throw new Error('Deleting product failed');
        return response.json();
    },

    editProduct: async (productId, editedProduct) => {
        const response = await fetch(`${BASE_URL}/editProduct/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getJwt()}`,
            },
            body: JSON.stringify({
                name: editedProduct.name,
                price: editedProduct.price,
                quantity: editedProduct.quantity,
                amount: editedProduct.price * editedProduct.quantity
            })
        });

        if(!response.ok) throw new Error('Editing product failed');
        return response.json();
    }
    
};

export default apiService;