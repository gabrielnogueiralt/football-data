import { createRouter, createWebHistory } from 'vue-router';
import LeaguesView from '../views/LeaguesView.vue';
import TeamsView from '../views/TeamsView.vue';
import TeamPlayersView from '../views/TeamPlayersView.vue';

const routes = [
  {
    path: '/',
    name: 'leagues',
    component: LeaguesView,
  },
  {
    path: '/league/:id',
    name: 'teams',
    component: TeamsView,
    props: true,
  },
  {
    path: '/team/:id',
    name: 'team-players',
    component: TeamPlayersView,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
