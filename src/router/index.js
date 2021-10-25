import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Main from "../pages/Main.vue";
import Profile from "../pages/Profile.vue"
import ProfileEdit from "../pages/ProfileEdit.vue"
import Post from "../pages/Post.vue"
import PostEdit from "../pages/PostEdit.vue"

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/profile',
    name: "Profile",
    component: Profile
  },
  {
    path: '/profile/edit',
    name: 'ProfileEdit',
    component: ProfileEdit
  },
  {
    path: '/post/:id',
    component: Post
  },
  {
    path: '/post/edit/:id',
    component: PostEdit
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
