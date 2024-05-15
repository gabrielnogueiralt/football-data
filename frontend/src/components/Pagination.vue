<!-- components/Pagination.vue -->
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{ currentPage: number, totalPages: number }>();
const emits = defineEmits(['prevPage', 'nextPage']);

const handlePrevPage = () => {
    if (props.currentPage > 1) {
        emits('prevPage');
    }
};

const handleNextPage = () => {
    if (props.currentPage < props.totalPages) {
        emits('nextPage');
    }
};
</script>

<template>
    <nav aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
            <li :class="['page-item', { disabled: currentPage === 1 }]">
                <button class="page-link" @click="handlePrevPage" :disabled="currentPage === 1">Previous</button>
            </li>
            <li class="page-item disabled">
                <span class="page-link">{{ currentPage }} / {{ totalPages }}</span>
            </li>
            <li :class="['page-item', { disabled: currentPage === totalPages }]">
                <button class="page-link" @click="handleNextPage" :disabled="currentPage === totalPages">Next</button>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
.page-link {
    cursor: pointer;
}
</style>
