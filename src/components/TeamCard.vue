<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { Team } from '../types/football-data';

const props = defineProps<{ team: Team }>();
const router = useRouter();

const navigateToTeam = (id: number) => {
  router.push({ name: 'team-players', params: { id } });
};
</script>

<template>
  <div class="card team-card m-2" @click="navigateToTeam(props.team.id)">
    <img :src="props.team.crest" class="card-img-top" :alt="props.team.name">
    <div class="card-body">
      <h5 class="card-title text-center mb-2">{{ props.team.name }}</h5>
      <p class="card-text text-center text-muted">
        <strong>Venue:</strong> {{ props.team.venue }}<br>
        <strong>Founded:</strong> {{ props.team.founded }}
      </p>
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