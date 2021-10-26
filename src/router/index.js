import { createRouter, createWebHistory } from "vue-router";
import PageUserAuthRegistration from "../pages/PageUserAuthRegistration.vue";
import PageUserAuthLogin from "../pages/PageUserAuthLogin.vue";
import PagePosts from "../pages/PagePosts.vue";
import PageUserProfile from "../pages/PageUserProfile.vue"
import PageUserProfileEdit from "../pages/PageUserProfileEdit.vue"
import PagePost from "../pages/PagePost.vue"
import PagePostEdit from "../pages/PagePostEdit.vue"

const routes = [
  {
    path: "/",
    name: "PagePosts",
    component: PagePosts
  },
  {
    path: "/register",
    name: "PageUserAuthRegistration",
    component: PageUserAuthRegistration
  },
  {
    path: "/login",
    name: "PageUserAuthLogin",
    component: PageUserAuthLogin
  },
  {
    path: '/profile',
    name: "PageUserProfile",
    component: PageUserProfile
  },
  {
    path: '/profile/edit',
    name: 'PageUserProfileEdit',
    component: PageUserProfileEdit
  },
  {
    path: '/post/:id',
    component: PagePost
  },
  {
    path: '/post/edit/:id',
    component: PagePostEdit
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
