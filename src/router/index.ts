import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import Login from '../pages/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexPage
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router