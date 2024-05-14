// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router';
import { useFootballDataStore } from '../stores/football-data';
import LeaguesView from '../views/LeaguesView.vue';
import TeamsView from '../views/TeamsView.vue';
import TeamPlayersView from '../views/TeamPlayersView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import FavoritesView from '../views/FavoritesView.vue';

const routes = [
  {
    path: '/',
    name: 'leagues',
    component: LeaguesView
  },
  {
    path: '/league/:id',
    name: 'teams',
    component: TeamsView,
  },
  {
    path: '/team/:id',
    name: 'team-players',
    component: TeamPlayersView,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const store = useFootballDataStore();
  const res = store.checkAuth();
  if (to.name === 'login' || to.name === 'signup') {
    if (res) {
      next({ name: 'leagues' });
    } else {
      next();
    }
  } else {
    if (res) {
      next();
    } else {
      next({ name: 'login' });
    }
  }
});

export default router;
