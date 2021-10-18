import { createStore } from "vuex";
import { auth } from "./modules/auth.module";
import { posts } from "./modules/posts.module";

export default createStore({
  modules: {
    auth,
    posts
  }
});
