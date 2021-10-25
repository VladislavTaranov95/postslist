import service from "@/helpers/api";

export const posts = {
  namespaced: true,
  state: {
    posts: [],
    post: null,
    skip: 0,
    limit: 10,
    totalPages: 0,
    filtered: null,
    totalPosts: 0,
    currentPost: null,
  },
  getters: {
    getPost: state => {
      return state.post
    },
    getTotalPosts: state => {
      return state.totalPosts
    },
    getCurrentPost: state => {
      return state.currentPost
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        const response = await service.get("posts");
        commit("setPosts", response.data.data);
      } catch (e) {
        console.log(e);
      }
    },
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
        commit("setPosts", [...state.posts, ...response.data.data], response.data.pagination.total);
        if (state.filtered) {
          commit('sortedPosts', state.filtered)
        }
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
    async getPostById({ commit }, id) {
      return service.get(`posts/${id}`).then(
        response => {
          commit("getPost", response.data);
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.response.data.error);
        }
      )
    },
    async getTotalPosts({ commit }) {
      return service.get("posts").then(
        response => {
          commit("setTotalPosts", response.data.pagination.total);
          return Promise.resolve(response.data.pagination.total);
        },
        error => {
          return Promise.reject(error.response.data.error);
        }
      )
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
    },
    async findAllPosts({ commit, state }, userId) {
      return service.get("posts", {
        params: {
          limit: state.totalPosts
        }
      }).then(response => {
        const userPosts = response.data.data.filter(post => post.postedBy === userId)
        const data = [...userPosts]
        commit("setPosts", data);
        return Promise.resolve(data);
      })
    },
    async setLikeToPost(context, id) {
      return service.put(`posts/like/${id}`).then(
        response => {
          return Promise.resolve(response);
        },
        error => {
          return Promise.reject(error.error);
        }
      )
    },
    async savePost({ commit }, post) {
      return service.patch(`posts/${post._id}`, {
        title: post.title,
        fullText: post.fullText,
        description: post.description
      }).then(
        (response) => {
          commit("updatePost", response.data)
          return Promise.resolve(response.data);
        },
        error => {
          return Promise.reject(error.error);
        }
      )
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
      if (state.filtered) {
        this.commit('sortedPosts', state.filtered)
      }
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
    sortedPosts(state, data) {
      state.posts.sort(function compare(a, b) {
        if (a[data] < b[data]) {
          return -1;
        }
        if (a[data] > b[data]) {
          return 1;
        }
        return 0;
      })
      state.filtered = data
    },
    getPost(state, data) {
      state.post = data
    },
    setTotalPosts(state, data) {
      state.totalPosts = data
    },
    setCurrentPost(state, currentPost) {
      state.currentPost = currentPost
    },
    setLike(state, data) {
      state.posts.forEach(item => {
        if (item._id === data.postId) {
          if (!item.likes.includes(data.userId)) {
            return item.likes.push(data.userId)
          } else {
            return item.likes.splice(item.likes.indexOf(data.userId), 1)
          }
        }
      })
      console.log(state.posts)
    },
    updatePost(state, data) {
      state.posts.forEach(post => {
        if (post._id === data._id) {
          post = { ...data }
        }
      })
    }
  }
};
