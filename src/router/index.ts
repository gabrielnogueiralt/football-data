import { createRouter, createWebHistory } from 'vue-router'
import LeaguesView from '../views/LeaguesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'leagues',
      component: LeaguesView
    },
    {
      path: '/teams',
      name: 'teams',
      component: () => import('../views/TeamsView.vue')
    },
    {
      path: '/team-players',
      name: 'players',
      component: () => import('../views/TeamPlayersView.vue')
    }
  ]
})

export default router
