/* eslint-disable */
import { createRouter, createWebHistory } from "vue-router";
import customerHome from "../views/customerHome";
import login from "../views/login";
import AdminHome from "../views/AdminHome";
import ManagerHome from "../views/ManagerHome";
import store from "../store/store";

const routes = [
  {
    path: "/customerHome",
    name: "customerHome",
    component: customerHome,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        next(false);
        this.$router.push("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/:catchAll(.*)",
    component: login,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminHome,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        this.$router.push("/login");
        next(false);
      } else {
        next();
      }
    },
  },
  {
    path: "/manager",
    name: "manager",
    component: ManagerHome,
    beforeEnter: (to, from, next) => {
      if (store.state.authenticated == false) {
        this.$router.push("/login");
        next(false);
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
