import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Menu from "@/view/menu/index.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "menu", component: Menu },
  {
    path: "/vList",
    name: "vList",
    component: () => import("@/view/vList/vListDemo.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
