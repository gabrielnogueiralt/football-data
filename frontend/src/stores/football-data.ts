import { defineStore } from 'pinia';
import ApiService from '../services/api-service';
import AuthService from '../services/auth-service';
import FavoritesService from '../services/favorites-service';
import type { Competition, LeagueDetails, TeamDetails } from '../types/football-data';

export const useFootballDataStore = defineStore('footballData', {
  state: () => ({
    top5Leagues: [] as Competition[],
    leagueDetails: {} as LeagueDetails | null,
    teamDetails: {} as TeamDetails | null,
    favorites: [] as number[],
    userId: null as number | null,
  }),
  getters: {
    getTop5Leagues: (state) => state.top5Leagues,
    getLeagueDetails: (state) => state.leagueDetails,
    getTeamDetails: (state) => state.teamDetails,
    getFavorites: (state) => state.favorites,
    isAuthenticated: (state) => !!state.userId,
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
        // HTTP 429: Too Many Requests
        if (error.response.status === 429) {
          console.error('Too many requests. Please try again later.', error);
          return 429;
        }
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
    async login(username: string, password: string) {
      try {
        const response = await AuthService.login(username, password);
        this.userId = response.userId;
        AuthService.setUserId(response.userId.toString());
        await this.loadFavorites();
        return response.userId;
      } catch (error) {
        console.error('Failed to login:', error);
        return null;
      }
    },
    async signup(username: string, password: string) {
      try {
        const response = await AuthService.signup(username, password);
        AuthService.setUserId(response.userId.toString());
        this.userId = response.userId;
        await this.loadFavorites();
        return response.userId;
      } catch (error) {
        console.error('Failed to signup:', error);
      }
    },
    async logout() {
      this.userId = null;
      this.favorites = [];
      AuthService.logout();
    },
    async saveFavorite(teamId: number) {
      if (!this.userId) return;
      try {
        await FavoritesService.saveFavorite(this.userId, teamId);
        this.favorites.push(teamId);
      } catch (error) {
        console.error('Failed to save favorite:', error);
      }
    },
    async removeFavorite(teamId: number) {
      if (!this.userId) return;
      try {
        await FavoritesService.removeFavorite(this.userId, teamId);
        this.favorites = this.favorites.filter((id) => id !== teamId);
      } catch (error) {
        console.error('Failed to remove favorite:', error);
      }
    },
    async loadFavorites() {
      if (!this.userId) return;
      try {
        const response = await FavoritesService.loadFavorites(this.userId);
        console.log('response', response);
        this.favorites = response;
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    },
    checkAuth() {
      const userId = AuthService.getUserId();
      if (userId) {
        this.userId = Number(userId);
        this.loadFavorites();
        return true;
      } else {
        this.userId = null;
        this.favorites = [];
        return false;
      }
    }
  }
});
