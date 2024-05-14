<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router'
import { useFootballDataStore } from './stores/football-data';
import NavBar from './components/NavBar.vue';

const footballDataStore = useFootballDataStore();

const isAuthenticated = computed(() => footballDataStore.isAuthenticated);
</script>

<template>
  <NavBar v-if="isAuthenticated" />
  <RouterView />
</template>