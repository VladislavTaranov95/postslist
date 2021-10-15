import axios from "axios";

export const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get(
          "http://51.158.179.21/api/v1/posts?limit=10"
        );
        commit("setPosts", response.data.data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    }
  }
};
