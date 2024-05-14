<script setup lang="ts">
import { defineProps } from 'vue';
import { Team } from '../types/football-data';
import TeamCard from '../components/TeamCard.vue';

const props = defineProps<{ teams: Team[] }>();
</script>

<template>
    <div class="teams-section flex-grow-1">
        <h2 class="mb-4 text-center">Teams</h2>
        <div class="d-flex flex-wrap justify-content-center">
            <TeamCard v-for="team in props.teams" :key="team.id" :team="team" />
        </div>
    </div>
</template>