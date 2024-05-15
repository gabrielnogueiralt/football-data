import { beforeEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios';
import ApiService from '../api-service';

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

describe('ApiService', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    })

    it('should fetch tier one leagues', async () => {
        const mockResponse = { data: { competitions: [] } };

        axios.get.mockResolvedValue(mockResponse);

        const response = await ApiService.getTierOneLeagues();
        expect(response).toEqual(mockResponse);
        expect(axios.get).toHaveBeenCalledWith('/competitions?plan=TIER_ONE&areas=2077');
    });

    it('should fetch league teams', async () => {
        const mockResponse = { data: { teams: [] } };
        axios.get.mockResolvedValue(mockResponse);

        const leagueId = 2021;
        const response = await ApiService.getLeagueTeams(leagueId);
        expect(response).toEqual(mockResponse);
        expect(axios.get).toHaveBeenCalledWith(`/competitions/${leagueId}/teams`);
    });

    it('should fetch league standings', async () => {
        const mockResponse = { data: { standings: [] } };
        axios.get.mockResolvedValue(mockResponse);

        const leagueId = 2000;
        const response = await ApiService.getLeagueStandings(leagueId);
        expect(response).toEqual(mockResponse);
        expect(axios.get).toHaveBeenCalledWith(`/competitions/${leagueId}/standings`);
    });

    it('should fetch team details', async () => {
        const mockResponse = { data: { team: {} } };
        axios.get.mockResolvedValue(mockResponse);

        const teamId = 100;
        const response = await ApiService.getTeam(teamId);
        expect(response).toEqual(mockResponse);
        expect(axios.get).toHaveBeenCalledWith(`/teams/${teamId}`);
    });
});
