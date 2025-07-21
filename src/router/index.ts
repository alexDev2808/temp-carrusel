import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/ensamble',
    name: 'Ensamble',
    component: () => import('../views/EnsambleView.vue')
  },
  {
    path: '/inyeccion',
    name: 'Inyeccion',
    component: () => import('../views/InyeccionView.vue'),
  },
  {
    path: '/comunicados',
    name: 'Comunicados',
    component: () => import('../views/ComunicadosView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'No encontrado',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router