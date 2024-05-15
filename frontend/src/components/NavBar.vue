<script setup lang="ts">
import { useRouter } from 'vue-router';
import AuthService from '../services/auth-service';
import { useFootballDataStore } from '../stores/football-data';

const router = useRouter();
const footballDataStore = useFootballDataStore();

const logout = () => {
    AuthService.logout();
    footballDataStore.userId = null;
    router.push('/login');
};
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Football Data</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Leagues</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/favorites">Favorites</router-link>
                    </li>
                    <li class="nav-item">
                        <button class="btn nav-link" @click="logout">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.nav-link {
    cursor: pointer;
}
</style>
