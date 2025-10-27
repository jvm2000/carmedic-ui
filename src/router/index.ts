import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import Login from '../pages/login.vue'
import Dashboard from '../pages/dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexPage
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router