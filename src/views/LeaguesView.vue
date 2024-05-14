<script setup lang="ts">
import LeaguesList from '../components/LeaguesList.vue'
import { onMounted } from 'vue';
import { computed } from 'vue';
import { useFootballDataStore } from '../stores/football-data';

const top5LeaguesIds = [2002, 2014, 2015, 2019, 2021];
const footballDataStore = useFootballDataStore();
const { leagues } = footballDataStore;

const filteredLeagues = computed(() => {
  return leagues.filter((league) => top5LeaguesIds.includes(league.id));
});

console.log(filteredLeagues);

onMounted(() => {
  footballDataStore.fetchTierOneLeagues();
});
</script>

<template>
  <main>
    <LeaguesList :leaguesData="filteredLeagues" />
  </main>
</template>
