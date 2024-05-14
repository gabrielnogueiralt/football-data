<script setup lang="ts">
import { defineProps } from 'vue';
import { Player } from '../types/football-data';

const props = defineProps<{ player: Player }>();

const getPersonAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};
</script>

<template>
    <div class="card player-card m-2">
        <div class="card-body">
            <h5 class="card-title text-center">{{ props.player.name }}</h5>
            <p class="card-text text-center text-muted">
                <strong>Position:</strong> {{ props.player.position }}<br>
                <strong>Nationality:</strong> {{ props.player.nationality }}<br>
                <strong>Age:</strong> {{ getPersonAge(props.player.dateOfBirth) }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.card-title {
    font-size: 1.25rem;
}

.card-text {
    font-size: 0.9rem;
}

.player-card {
    width: calc(50% - 1rem);
    flex: 1 1 calc(50% - 1rem);
    max-width: 300px;
}

.player-card:hover {
    cursor: pointer;
    transform: scale(1.02);
    transition: transform 0.2s ease-in-out;
}
</style>
