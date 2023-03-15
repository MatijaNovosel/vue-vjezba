import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Active from "../views/Active.vue";
import Archived from "../views/Archived.vue";
import Inactive from "../views/Inactive.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/active"
  },
  {
    path: "/active",
    name: "active",
    component: Active
  },
  {
    path: "/inactive",
    name: "inactive",
    component: Inactive
  },
  {
    path: "/archived",
    name: "archived",
    component: Archived
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
