<script setup lang="ts">
import { defineProps } from 'vue';
import { TeamDetails } from '../types/football-data';

const props = defineProps<{ team: TeamDetails }>();
</script>

<template>
    <div class="team-details mb-4">
        <h2 class="text-center">Team Details</h2>
        <div class="card">
            <img :src="props.team.crest" class="card-img-top" :alt="props.team.name">
            <div class="card-body">
                <h5 class="card-title text-center">{{ props.team.name }}</h5>
                <p class="card-text text-center text-muted">
                    <strong>Venue:</strong> {{ props.team.venue }}<br>
                    <strong>Founded:</strong> {{ props.team.founded }}<br>
                    <strong>Club Colors:</strong> {{ props.team.clubColors }}<br>
                </p>
            </div>
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
</style>