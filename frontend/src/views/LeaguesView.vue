<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFootballDataStore } from '../stores/football-data';
import LeagueList from '../components/LeagueList.vue';
import { Competition } from '../types/football-data';

const footballDataStore = useFootballDataStore();
const filteredLeagues = ref<Competition[]>([]);

onMounted(async () => {
  await footballDataStore.fetchTop5Leagues();
  filteredLeagues.value = footballDataStore.getTop5Leagues;
});
</script>

<template>
  <main>
    <LeagueList :leaguesData="filteredLeagues" />
  </main>
</template>
