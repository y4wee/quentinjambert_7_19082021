import { createRouter, createWebHashHistory } from 'vue-router'
import Log from '../views/Log.vue'
import About from '../views/About.vue'
import Compte from '../views/Compte.vue'
import Creation from '../views/Creation.vue'
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
    path: '/creation',
    name: 'Creation',
    component: Creation
  },
  {
    path: '/compte',
    name: 'Compte',
    component: Compte
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
