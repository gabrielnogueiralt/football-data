<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '../services/api-service';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import TeamsSection from '../components/TeamsSection.vue';
import StandingsSection from '../components/StandingsSection.vue';
import type { Team, Standing } from '../types/football-data';

const route = useRoute();
const leagueId = ref(route.params.id);
const teams = ref<Team[]>([]);
const standings = ref<Standing[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const sortKey = ref('name');

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

const filteredTeams = computed(() =>
  teams.value.filter(team =>
    team.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Teams and Standings</h1>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else>
      <div class="search-bar mb-4">
        <input type="text" class="form-control" placeholder="Search for a team..." v-model="searchQuery" />
      </div>
      <div class="mb-4 text-center">
        <label for="sortKey">Sort by: </label>
        <select id="sortKey" v-model="sortKey" class="form-select d-inline-block w-auto ms-2">
          <option value="name">Name</option>
          <option value="founded">Founded</option>
        </select>
      </div>
      <div class="d-flex flex-wrap justify-content-center">
        <TeamsSection class="mb-4" :teams="filteredTeams" :sortKey="sortKey" />
        <StandingsSection :standings="standings" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
