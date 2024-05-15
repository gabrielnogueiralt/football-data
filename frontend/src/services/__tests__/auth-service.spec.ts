import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios';
import AuthService from '../auth-service';

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

describe('AuthService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        localStorage.clear();
    });

    it('should get user id from local storage', () => {
        localStorage.setItem('user-id', '123');
        const userId = AuthService.getUserId();
        expect(userId).toBe('123');
    });

    it('should set user id in local storage', () => {
        AuthService.setUserId('123');
        const userId = localStorage.getItem('user-id');
        expect(userId).toBe('123');
    });

    it('should remove user id from local storage', () => {
        localStorage.setItem('user-id', '123');
        AuthService.removeUserId();
        const userId = localStorage.getItem('user-id');
        expect(userId).toBeNull();
    });

    it('should login user and return response data', async () => {
        const mockResponse = { data: { userId: 1, token: 'token123' } };
        axios.post.mockResolvedValue(mockResponse);

        const response = await AuthService.login('user', 'password');
        expect(response).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/login', { username: 'user', password: 'password' });
    });

    it('should signup user and return response data', async () => {
        const mockResponse = { data: { userId: 1, token: 'token123' } };
        axios.post.mockResolvedValue(mockResponse);

        const response = await AuthService.signup('user', 'password');
        expect(response).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/signup', { username: 'user', password: 'password' });
    });

    it('should logout user and remove user id from local storage', () => {
        localStorage.setItem('user-id', '123');
        AuthService.logout();
        const userId = localStorage.getItem('user-id');
        expect(userId).toBeNull();
    });
});
