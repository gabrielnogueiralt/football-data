<script setup lang="ts">
import { ref } from 'vue';
import { useFootballDataStore } from '../stores/football-data';
import { useRoute, useRouter } from 'vue-router';

const footballDataStore = useFootballDataStore();
const username = ref('');
const password = ref('');
const route = useRoute();
const router = useRouter();
const errorMessage = ref('')
const successMessage = route.query.success || '';

const handleLogin = async () => {
    const res = await footballDataStore.login(username.value, password.value);
    if (!res) {
        errorMessage.value = 'Invalid username or password';
        return;
    }
    router.push({ name: 'leagues' });
};
</script>

<template>
    <div class="container mt-5">
        <h1 class="mb-4 text-center">Login</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <div v-if="successMessage" class="alert alert-success">{{ successMessage }}</div>
                        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                        <form @submit.prevent="handleLogin">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" id="username" v-model="username" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" v-model="password" class="form-control" required />
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                            <div class="mt-3 text-center">
                                <p>
                                    Don't have an account?
                                    <router-link to="/signup">Sign Up</router-link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    max-width: 500px;
    margin: 0 auto;
}
</style>
