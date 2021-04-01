/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router'
import customerHome from '../views/customerHome'
import login from '../views/login'
import NotFound from '../views/NotFound'

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
    component: NotFound,
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
