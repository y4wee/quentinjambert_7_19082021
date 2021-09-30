import { createRouter, createWebHistory } from 'vue-router'
import Log from '../views/Log.vue'
import Compte from '../views/Compte.vue'
import Creating from '../views/Creating.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Log',
    component: Log
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/creating',
    name: 'Creating',
    component: Creating
  },
  {
    path: '/compte',
    name: 'Compte',
    component: Compte
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
