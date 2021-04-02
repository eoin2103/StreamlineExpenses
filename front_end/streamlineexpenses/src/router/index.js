/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import customerHome from '../views/customerHome'
import login from '../views/login'

const routes = [
  {
    path:'/customerHome',
    name: 'customerHome',
    component: customerHome
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: "/:catchAll(.*)",
    component: login,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
