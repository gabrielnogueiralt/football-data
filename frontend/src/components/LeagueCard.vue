<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import type { Competition } from '../types/football-data';

const props = defineProps<{ league: Competition }>();
const router = useRouter();

const navigateToLeague = (id: number) => {
    router.push({ name: 'teams', params: { id } });
};
</script>

<template>
    <div class="card league-card h-100 shadow-sm border-0" @click="navigateToLeague(props.league.id)">
        <img :src="props.league.emblem || props.league.area.flag" class="card-img-top" :alt="props.league.name">
        <div class="card-body">
            <h5 class="card-title text-center mb-2">{{ props.league.name }}</h5>
            <p class="card-text text-center text-muted">
                <strong>{{ props.league.area.name }}</strong><br>
                <strong>Start:</strong> {{ props.league.currentSeason.startDate }} <br>
                <strong>End:</strong> {{ props.league.currentSeason.endDate }}
            </p>
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

.card:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
}
</style>
