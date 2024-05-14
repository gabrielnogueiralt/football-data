import { defineStore } from 'pinia';
import ApiService from '../services/api-service';

export const useFootballDataStore = defineStore('footballData', {
  state: () => ({
    top5Leagues: [],
    leagueDetails: {},
    teamDetails: {},
  }),
  getters: {
    top5Leagues: (state) => state.top5Leagues,
    leagueDetails: (state) => state.leagueDetails,
    teamDetails: (state) => state.teamDetails,
  },
  actions: {
    async fetchTop5Leagues() {
      try {
        const response = await ApiService.getTierOneLeagues();
        this.top5Leagues = response.data.competitions;
      } catch (error) {
        console.error('Failed to fetch top 5 leagues:', error);
      }
    },
    async fetchLeagueDetails(id: number) {
      try {
        const response = await ApiService.getLeagueDetails(id);
        this.leagueDetails = response.data;
      } catch (error) {
        console.error('Failed to fetch league details:', error);
      }
    },
    async fetchTeamDetails(id: number) {
      try {
        const response = await ApiService.getTeam(id);
        this.teamDetails = response.data;
      } catch (error) {
        console.error('Failed to fetch team details:', error);
      }
    },
  }
});
