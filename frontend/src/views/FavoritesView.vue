<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFootballDataStore } from '../stores/football-data';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import TeamsSection from '../components/TeamsSection.vue';
import { Team } from '../types/football-data';

const footballDataStore = useFootballDataStore();
const favoriteTeams = ref<Team[]>([]);
const loading = ref(true);

const loadFavoriteTeams = async () => {
    await footballDataStore.loadFavorites();
    const favoriteTeamIds = footballDataStore.getFavorites;
    const teams = await Promise.all(
        favoriteTeamIds.map(async (id: number) => {
            await footballDataStore.fetchTeamDetails(id);
            return footballDataStore.getTeamDetails;
        })
    );
    favoriteTeams.value = teams.filter(team => team !== null) as Team[];
    loading.value = false;
};

onMounted(() => {
    loadFavoriteTeams();
});
</script>

<template>
    <div class="container mt-5">
        <h1 class="mb-4 text-center">Favorite Teams</h1>
        <div v-if="loading" class="text-center">
            <LoadingSpinner />
        </div>
        <div v-else-if="favoriteTeams.length">
            <TeamsSection :teams="favoriteTeams" />
        </div>
        <div v-else>
            <p class="text-center text-muted">No favorite teams added yet.</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 900px;
}
</style>
