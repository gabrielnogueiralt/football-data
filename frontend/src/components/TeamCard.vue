<!-- components/TeamCard.vue -->
<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useFootballDataStore } from '../stores/football-data';
import { Team } from '../types/football-data';

const props = defineProps<{ team: Team }>();
const footballDataStore = useFootballDataStore();
const router = useRouter();

const navigateToTeam = (id: number) => {
  router.push({ name: 'team-players', params: { id } });
};

const isFavorite = computed(() => footballDataStore.favorites.includes(props.team.id));

const toggleFavorite = async (teamId: number) => {
  if (isFavorite.value) {
    await footballDataStore.removeFavorite(teamId);
  } else {
    await footballDataStore.saveFavorite(teamId);
  }
};
</script>

<template>
  <div class="card team-card m-2 shadow-sm border-0" @click="navigateToTeam(props.team.id)">
    <img :src="props.team.crest" class="card-img-top" :alt="props.team.name">
    <div class="card-body text-center">
      <h5 class="card-title mb-2">{{ props.team.name }}</h5>
      <p class="card-text text-muted">
        <strong>Venue:</strong> {{ props.team.venue }}<br>
        <strong>Founded:</strong> {{ props.team.founded }}
      </p>
      <div class="d-flex justify-content-center">
        <button @click.stop="toggleFavorite(props.team.id)" class="btn btn-sm"
          :class="isFavorite ? 'btn-danger' : 'btn-outline-primary'">
          {{ isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-card {
  width: calc(50% - 1rem);
  flex: 1 1 calc(50% - 1rem);
  max-width: 300px;
}

.team-card img {
  height: 200px;
  object-fit: contain;
}

.card-title {
  font-size: 1.25rem;
}

.card-text {
  font-size: 0.9rem;
}

.card:hover {
  cursor: pointer;
  transform: scale(1.02);
  transition: transform 0.2s ease-in-out;
}
</style>
