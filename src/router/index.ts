import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Menu from "@/view/menu/index.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "menu", component: Menu },
  {
    path: "/vList",
    name: "vList",
    component: () => import("@/view/vList/vListDemo.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/view/demo/test.vue"),
  },
  {
    path: "/contextmenu",
    name: "contextmenu",
    component: () => import("@/view/contextmenu/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
