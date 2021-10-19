import service from "@/helpers/api";

export const posts = {
  namespaced: true,
  state: {
    posts: [],
    skip: 0,
    limit: 10,
    totalPages: 0,
    options: [
      { value: "title", name: "By title" },
      { value: "description", name: "By description" },
    ],
    selectedSort: "",
  },
  getters: {
    sortedPosts(state) {
      console.log('11212342')
      return [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
    },
  },
  actions: {
    async loadMorePosts({ state, commit }) {
      try {
        commit("setPage", state.page + 1);
        const response = await service.get("posts", {
          params: {
            limit: state.limit,
            skip: state.skip
          }
        });
        commit("setSkip", state.skip + 10);
        commit("setPosts", [...state.posts, ...response.data.data]);
      } catch (e) {
        console.log(e);
      }
    },
    async addNewPost({ commit }, post) {
      try {
        const response = await service.post("posts", {
          title: post.title,
          description: post.description,
          fullText: post.fullText
        });

        commit("setPost", response.data);
      } catch (e) {
        console.log(e.error);
      }
    },
    async deletePost({ commit }, id) {
      return service.delete(`posts/${id}`).then(
        response => {
          commit("deletePost", id);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.response.data.error);
        }
      )
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.posts.push(post);
    },
    deletePost(state, id) {
      state.posts = state.posts.filter(p => p._id !== id);
    },
    setPage(state, page) {
      state.page = page;
    },
    setSkip(state, skip) {
      state.skip = skip;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    }
  }
};
