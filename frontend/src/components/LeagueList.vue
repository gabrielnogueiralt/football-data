<script setup lang="ts">
import { defineProps } from 'vue';
import { Competition } from '../types/football-data';
import LeagueCard from './LeagueCard.vue';
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps<{ leaguesData: Competition[] }>();
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Top European Leagues</h1>
    <div v-if="leaguesData.length" class="league-list d-flex flex-wrap justify-content-center">
      <LeagueCard v-for="league in props.leaguesData" :key="league.id" :league="league" />
    </div>
    <div v-else>
      <LoadingSpinner />
    </div>
  </div>
</template>

<style scoped>
.league-list {
  gap: 1rem;
}
</style>
