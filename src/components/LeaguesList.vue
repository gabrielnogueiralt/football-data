<script setup lang="ts">
import { onMounted } from 'vue';
import { useFootballDataStore } from '../stores/football-data';

const footballDataStore = useFootballDataStore();

onMounted(() => {
  footballDataStore.fetchTierOneLeagues();
});
</script>

<template>
  <div class="container mt-3">
    <h1 class="mb-3">Top European Leagues</h1>
    <div v-if="footballDataStore.leagues.length">
      <ul class="list-group">
        <li v-for="league in footballDataStore.leagues" :key="league.id"
          class="list-group-item d-flex justify-content-between align-items-center">
          {{ league.name }}
          <span class="badge bg-primary rounded-pill">{{ league.area.name }}</span>
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="text-muted">Loading leagues...</p>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional CSS styling here */
</style>
