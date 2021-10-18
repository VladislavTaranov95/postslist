import service from "@/helpers/api";

export const posts = {
  namespaced: true,
  state: {
    posts: []
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await service.get(
          "http://51.158.179.21/api/v1/posts?limit=10"
        );
        commit("setPosts", response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
    addNewPost({ commit }, post) {
      commit("setPost", post);
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.posts.push(post);
    }
  }
};
