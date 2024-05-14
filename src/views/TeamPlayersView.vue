<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ApiService from '../services/api-service';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import TeamDetailsCard from '../components/TeamDetailsCard.vue';
import CoachDetailsCard from '../components/CoachDetailsCard.vue';
import PlayerCard from '../components/PlayerCard.vue';
import { TeamDetails } from '../types/football-data';

const route = useRoute();
const teamId = ref(route.params.id);
const team = ref<TeamDetails | null>(null);
const loading = ref(true);

const fetchTeamDetails = async () => {
  try {
    const response = await ApiService.getTeam(Number(teamId.value));
    team.value = response.data;
  } catch (error) {
    console.error('Failed to fetch team details:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTeamDetails();
});
</script>

<template>
  <div class="container mt-5">
    <h1 v-if="team" class="mb-4 text-center">{{ team.name }}</h1>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="team">
      <TeamDetailsCard :team="team" />
      <CoachDetailsCard :coach="team.coach" />
      <div class="players-section">
        <h2 class="text-center">Players</h2>
        <div class="d-flex flex-wrap justify-content-center">
          <PlayerCard v-for="player in team.squad" :key="player.id" :player="player" />
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-muted">Team not found</p>
    </div>
  </div>
</template>
