import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import("../views/SignupView.vue"),
  },
  {
    path: "/profile/:id",
    name: "ProfileView",
    component: () =>
      import("../views/ProfileView.vue"),
  },
  {
    path: "/feed",
    name: "FeedView",
    component: () =>
      import("../views/FeedView.vue"),
  },
  {
    path: "/viewpost/:id",
    name: "viewPost",
    component: () =>
      import("../views/ViewPost.vue"),
  },
  {
    path: "/addpost",
    name: "addPost",

    component: () =>
      import("../views/AddPost.vue"),
  },
];

const router = createRouter({
  //removed hash on the url
  history: createWebHistory(),
  routes,
});

export default router;
