import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ItemView from "@/views/ItemView.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  { path: "/", redirect: "/active" },
  { path: "/active", name: "active", component: ItemView },
  { path: "/done", name: "done", component: ItemView },
  { path: "/archived", name: "archived", component: ItemView }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export { router };
