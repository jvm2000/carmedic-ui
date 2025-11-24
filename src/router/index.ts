import { createRouter, createWebHistory } from 'vue-router'
import IndexPage from '../pages/index.vue'
import LoginPage from '../pages/login.vue'
import Form from '../pages/form.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: IndexPage
  }, {
    path: '/login',
    name: 'Login',
    component: LoginPage
  }, {
    path: '/dashboard',
    name: 'Form',
    component: Form
  }
]

const router = createRouter({
  history: createWebHistory('/carmedic/'),
  routes
})

export default router