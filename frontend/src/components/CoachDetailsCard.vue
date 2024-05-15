<script setup lang="ts">
import { defineProps } from 'vue';
import type { Coach } from '../types/football-data';

const props = defineProps<{ coach: Coach }>();

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
    <div class="coach-section mb-4">
        <h2 class="text-center">Coach</h2>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title text-center">{{ props.coach.name }}</h5>
                <p class="card-text text-center text-muted">
                    <strong>Nationality:</strong> {{ props.coach.nationality }}<br>
                    <strong>Age:</strong> {{ getPersonAge(props.coach.dateOfBirth) }}<br>
                    <strong>Contract:</strong> {{ props.coach.contract.start }} to {{ props.coach.contract.until }}
                </p>
            </div>
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
</style>