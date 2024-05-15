<script setup lang="ts">
import { defineProps } from 'vue';
import type { Standing } from '../types/football-data';

const props = defineProps<{ standing: Standing }>();
</script>

<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
            <img :src="props.standing.team.crest" alt="" width="30" height="30" class="me-2">
            <span>{{ props.standing.team.name }}</span>
        </div>
        <span class="badge bg-primary rounded-pill">{{ props.standing.points }} pts</span>
    </li>
</template>

<style scoped>
.list-group-item img {
    width: 30px;
    height: 30px;
}

.list-group-item .badge {
    font-size: 1rem;
}
</style>