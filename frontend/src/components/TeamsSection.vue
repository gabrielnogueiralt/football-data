<script setup lang="ts">
import { defineProps, computed } from 'vue';
import type { Team } from '../types/football-data';
import TeamCard from './TeamCard.vue';

const props = defineProps<{ teams: Team[], sortKey: string }>();

// Computed property to sort teams based on the provided sort key
const sortedTeams = computed(() => {
    return [...props.teams].sort((a, b) => {
        if (props.sortKey === 'name') {
            // If 'a' team name is null, place it after 'b'
            if (!a.name) return 1;
            // If 'b' team name is null, place it after 'a'
            if (!b.name) return -1;
            // Otherwise, compare team names alphabetically
            return a.name.localeCompare(b.name);
        } else if (props.sortKey === 'founded') {
            if (a.founded === null) return 1;
            if (b.founded === null) return -1;
            return a.founded - b.founded;
            // Default case, no sorting
        } else {
            return 0;
        }
    });
});
</script>

<template>
    <div class="teams-section flex-grow-1">
        <h2 class="mb-4 text-center">Teams</h2>
        <div class="d-flex flex-wrap justify-content-center">
            <TeamCard v-for="team in sortedTeams" :key="team.id" :team="team" />
        </div>
    </div>
</template>

<style scoped>
.teams-section {
    width: 100%;
}
</style>
