import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import TabsPage from "../views/TabsPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/home",
  },
  {
    path: "/tabs/",
    component: TabsPage,
    children: [
      {
        path: "",
        redirect: "/tabs/home",
      },
      {
        path: "home",
        name: "home",
        component: () => import("@/views/HomePage.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import("@/views/LoginPage.vue"),
      },
      {
        path: "account",
        name: "account",
        component: () => import("@/views/AccountPage.vue"),
      },
      {
        path: "tools",
        name: "tools",
        component: () => import("@/views/ToolsPage.vue"),
      },
      {
        path: "registration",
        name: "registration",
        component: () => import("@/views/RegistrationPage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
