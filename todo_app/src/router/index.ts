import { createRouter, createWebHistory } from "vue-router";
import ROUTE_NAMES from "./routeNames";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
    children: [
      {
        path: "/tasks/:state",
        name: ROUTE_NAMES.TASKS,
        component: () => import("@/components/TaskTab.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
