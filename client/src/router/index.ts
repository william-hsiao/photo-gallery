import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ShowcaseView from "@/views/ShowcaseView.vue";
import SlideshowView from "@/views/SlideshowView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/showcase",
      name: "showcase",
      component: ShowcaseView,
    },
    {
      path: "/slideshow",
      name: "slideshow",
      component: SlideshowView,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
