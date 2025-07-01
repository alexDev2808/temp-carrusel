import { createRouter, createWebHistory } from 'vue-router'

import EnsambleView from '../views/EnsambleView.vue'
import InyeccionView from '../views/InyeccionView.vue'

const routes = [
  {
    path: '/',
    name: 'Ensamble',
    component: EnsambleView
  },
  {
    path: '/inyeccion',
    name: 'Inyeccion',
    component: () => import('../views/InyeccionView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router