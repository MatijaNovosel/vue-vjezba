import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ItemView from "@/views/ItemView.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", redirect: "/active" },
  { path: "/active", name: "Active", component: ItemView },
  { path: "/done", name: "Done", component: ItemView },
  { path: "/archived", name: "Archived", component: ItemView }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export { router };
