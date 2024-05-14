import { defineStore } from 'pinia';
import ApiService from '../services/api-service';
import type { Competition, LeagueDetails, TeamDetails } from '../types/football-data';

export const useFootballDataStore = defineStore('footballData', {
  state: () => ({
    top5Leagues: [] as Competition[],
    leagueDetails: {} as LeagueDetails | null,
    teamDetails: {} as TeamDetails | null,
  }),
  getters: {
    getTop5Leagues: (state) => state.top5Leagues,
    getLeagueDetails: (state) => state.leagueDetails,
    getTeamDetails: (state) => state.teamDetails,
  },
  actions: {
    async fetchTop5Leagues() {
      try {
        const response = await ApiService.getTierOneLeagues();
        const top5LeagueCodes = ['PL', 'BL1', 'PD', 'SA', 'FL1'];
        this.top5Leagues = response.data.competitions.filter((competition: Competition) =>
          competition.code && top5LeagueCodes.includes(competition.code)
        );
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
