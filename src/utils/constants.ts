import { ref } from "vue";
import { createDebounce } from "./helpers";
export const drawer = ref(false);
export const searchText = ref("");
export const items = [
  { icon: "mdi-view-dashboard", title: "Active", route: "/active" },
  { icon: "mdi-clock", title: "Inactive", route: "/inactive" },
  { icon: "mdi-archive", title: "Archived", route: "/archived" }
];
export const debounce = createDebounce();
export const langs = ["en", "hr"];
export const ROUTE_NAMES = {
  ACTIVE: "/active",
  INACTIVE: "/inactive",
  ARCHIVED: "/archived"
};
