import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios';
import FavoritesService from '../favorites-service';

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn(),
            get: vi.fn(),
            delete: vi.fn(),
            put: vi.fn(),
            create: vi.fn().mockReturnThis(),
            interceptors: {
                request: {
                    use: vi.fn(),
                    eject: vi.fn(),
                },
                response: {
                    use: vi.fn(),
                    eject: vi.fn(),
                },
            },
        },
    };
});

describe('FavoritesService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should save favorite', async () => {
        const userId = '1';
        const teamId = 57;
        const mockResponse = { success: true };
        axios.post.mockResolvedValue(mockResponse);

        await FavoritesService.saveFavorite(userId, teamId);

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/favorites',
            { teamId },
            { headers: { userId } }
        );
    });

    it('should remove favorite', async () => {
        const userId = '1';
        const teamId = 57;
        const mockResponse = { success: true };
        axios.delete.mockResolvedValue(mockResponse);

        await FavoritesService.removeFavorite(userId, teamId);

        expect(axios.delete).toHaveBeenCalledWith(
            `http://localhost:3000/favorites/${teamId}`,
            { headers: { userId } }
        );
    });

    it('should load favorites', async () => {
        const userId = '1';
        const mockResponse = { data: [57, 200, 300] };
        axios.get.mockResolvedValue(mockResponse);

        const response = await FavoritesService.loadFavorites(userId);

        expect(response).toEqual(mockResponse.data);
        expect(axios.get).toHaveBeenCalledWith(
            'http://localhost:3000/favorites',
            { headers: { userId } }
        );
    });
});