import axios from 'axios';

const API_URL = 'http://localhost:3000';

export default {
    async saveFavorite(userId: string, teamId: number) {
        await axios.post(`${API_URL}/favorites`, { teamId }, {
            headers: {
                'userId': userId,
            }
        });
    },
    async removeFavorite(userId: string, teamId: number) {
        await axios.delete(`${API_URL}/favorites/${teamId}`, {
            headers: {
                'userId': userId,
            }
        });
    },
    async loadFavorites(userId: string) {
        const response = await axios.get(`${API_URL}/favorites`, {
            headers: {
                'userId': userId,
            }
        });
        return response.data;
    },
};
