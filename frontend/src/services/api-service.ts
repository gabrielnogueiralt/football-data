import axios from 'axios';

const BASE_URL = '/api';
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-Auth-Token': API_TOKEN,
  },
});

export default {
  getTierOneLeagues() {
    return instance.get('/competitions?plan=TIER_ONE&areas=2077');
  },
  getLeagueTeams(id: number) {
    return instance.get(`/competitions/${id}/teams`);
  },
  getLeagueStandings(id: number) {
    return instance.get(`/competitions/${id}/standings`);
  },
  getTeam(id: number) {
    return instance.get(`/teams/${id}`);
  }
};
