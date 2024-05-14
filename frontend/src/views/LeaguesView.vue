<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFootballDataStore } from '../stores/football-data';
import LeagueList from '../components/LeagueList.vue';
import { Competition } from '../types/football-data';

const footballDataStore = useFootballDataStore();
const filteredLeagues = ref<Competition[]>([]);

const errorMessage = ref('');

onMounted(async () => {
  const res = await footballDataStore.fetchTop5Leagues();
  if (res === 429) {
    errorMessage.value = 'API rate limit exceeded. Please try again later.';
  }
  filteredLeagues.value = footballDataStore.getTop5Leagues;
});
</script>

<template>
  <main>
    <div class="container mt-5">
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
    </div>
    <LeagueList :leaguesData="filteredLeagues" />
  </main>
</template>
