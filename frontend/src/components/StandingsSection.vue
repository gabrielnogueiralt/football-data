<script setup lang="ts">
import { defineProps } from 'vue';
import { Standing } from '../types/football-data';
import StandingItem from '../components/StandingItem.vue';

const props = defineProps<{ standings: Standing[] }>();
</script>

<template>
    <div class="standings-section flex-grow-1">
        <h2 class="mb-4 text-center">Standings</h2>
        <ul class="list-group">
            <StandingItem v-for="standing in props.standings" :key="standing.team.id" :standing="standing" />
        </ul>
    </div>
</template>