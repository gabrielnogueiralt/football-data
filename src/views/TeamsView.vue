<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '../services/api-service';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import TeamsSection from '../components/TeamsSection.vue';
import StandingsSection from '../components/StandingsSection.vue';
import { Team, Standing } from '../types/football-data';

const route = useRoute();
const leagueId = ref(route.params.id);
const teams = ref<Team[]>([]);
const standings = ref<Standing[]>([]);
const loading = ref(true);

const fetchTeamsAndStandings = async () => {
  try {
    const [teamsResponse, standingsResponse] = await Promise.all([
      ApiService.getLeagueTeams(Number(leagueId.value)),
      ApiService.getLeagueStandings(Number(leagueId.value))
    ]);
    teams.value = teamsResponse.data.teams;
    standings.value = standingsResponse.data.standings[0].table;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTeamsAndStandings();
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Teams and Standings</h1>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="d-flex flex-wrap justify-content-center">
        <TeamsSection class="mb-4" :teams="teams" />
        <StandingsSection :standings="standings" />
      </div>
    </div>
  </div>
</template>
