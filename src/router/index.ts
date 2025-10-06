import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import AuthView from "@/views/AuthView.vue";
import TodoView from "@/views/TodoView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: AuthView,
    },
    {
      path: "/",
      name: "todos",
      component: TodoView,
      meta: { requiresAuth: true },
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "not-found",
    //   component: () => import("@/views/NotFound.vue"),
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth();

  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: "auth" });
  } else if (to.name === "auth" && isAuthenticated.value) {
    next({ name: "todos" });
  } else {
    next();
  }
});

export default router;
