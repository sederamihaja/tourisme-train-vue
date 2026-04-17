import { createRouter, createWebHistory } from "vue-router";
import Index from "@/views/Index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Index,
      meta: { title: "Tourisme en train - SNCF" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ?? "Tourisme en train - SNCF";
  next();
});

export default router;
