<!-- views/TeamPlayersView.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFootballDataStore } from '../stores/football-data';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import TeamDetailsCard from '../components/TeamDetailsCard.vue';
import CoachDetailsCard from '../components/CoachDetailsCard.vue';
import PlayerCard from '../components/PlayerCard.vue';
import Pagination from '../components/Pagination.vue';

const route = useRoute();
const teamId = ref(route.params.id);
const footballDataStore = useFootballDataStore();
const loading = ref(true);

const fetchTeamDetails = async () => {
  try {
    await footballDataStore.fetchTeamDetails(Number(teamId.value));
  } catch (error) {
    console.error('Failed to fetch team details:', error);
  } finally {
    loading.value = false;
  }
};

const handlePrevPage = () => {
  footballDataStore.prevPage;
};

const handleNextPage = () => {
  footballDataStore.nextPage;
};

onMounted(() => {
  fetchTeamDetails();
});
</script>

<template>
  <div class="container mt-5">
    <h1 v-if="footballDataStore.teamDetails" class="mb-4 text-center">{{ footballDataStore.teamDetails.name }}</h1>
    <div v-if="loading">
      <LoadingSpinner />
    </div>
    <div v-else-if="footballDataStore.teamDetails">
      <TeamDetailsCard :team="footballDataStore.teamDetails" />
      <CoachDetailsCard :coach="footballDataStore.teamDetails.coach" />
      <div class="players-section">
        <h2 class="text-center">Players</h2>
        <div class="d-flex flex-wrap justify-content-center">
          <PlayerCard v-for="player in footballDataStore.paginatedPlayers" :key="player.id" :player="player" />
        </div>
        <Pagination :currentPage="footballDataStore.currentPage" :totalPages="footballDataStore.totalPages"
          @prevPage="handlePrevPage" @nextPage="handleNextPage" />
      </div>
    </div>
    <div v-else>
      <p class="text-center text-muted">Team not found</p>
    </div>
  </div>
</template>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: contain;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 0.9rem;
}

.player-card {
  width: calc(50% - 1rem);
  flex: 1 1 calc(50% - 1rem);
  max-width: 300px;
}

.player-card:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition: transform 0.2s ease-in-out;
}
</style>
