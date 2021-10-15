import { createStore } from "vuex";
import { auth } from "./modules/auth.module";
import { posts } from "./modules/post.module";

export default createStore({
  modules: {
    auth,
    posts
  }
});
