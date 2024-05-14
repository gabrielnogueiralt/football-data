<script setup lang="ts">
import { ref } from 'vue';
import { useFootballDataStore } from '../stores/football-data';
import { useRouter } from 'vue-router';

const footballDataStore = useFootballDataStore();
const username = ref('');
const password = ref('');
const router = useRouter();

const handleSignup = async () => {
    const res = await footballDataStore.signup(username.value, password.value);
    if (!res) return;
    router.push({ name: 'login', query: { success: 'Signup successful! Please log in.' } });
};
</script>


<template>
    <div class="container mt-5">
        <h1 class="mb-4 text-center">Sign Up</h1>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm border-0">
                    <div class="card-body">
                        <form @submit.prevent="handleSignup">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="text" id="username" v-model="username" class="form-control" required />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" id="password" v-model="password" class="form-control" required />
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Sign Up</button>
                            </div>
                            <div class="mt-3 text-center">
                                <p>
                                    Already have an account?
                                    <router-link to="/">Login</router-link>
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
