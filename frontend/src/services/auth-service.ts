import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
    getUserId() {
        return localStorage.getItem('user-id');
    },
    setUserId(userId: string) {
        localStorage.setItem('user-id', userId);
    },
    removeUserId() {
        localStorage.removeItem('user-id');
    },
    async login(username: string, password: string) {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        return response.data;
    },
    async signup(username: string, password: string) {
        const response = await axios.post(`${API_URL}/signup`, { username, password });
        return response.data;
    },
    async logout() {
        this.removeUserId();
    }
};
