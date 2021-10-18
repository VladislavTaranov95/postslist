import service from "@/helpers/api";

export const auth = {
  namespaced: true,
  state: {
    status: {
      loggedIn: false
    },
    user: null
  },
  actions: {
    login({ commit }, user) {
      return service
        .post("auth", {
          email: user.email,
          password: user.password
        })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }

          return service.get("auth/user");
        })
        .then(
          user => {
            commit("loginSuccess", user);

            return Promise.resolve(user);
          },
          error => {
            commit("loginFailure");
            return Promise.reject(error);
          }
        );
    },
    register({ commit }, user) {
      return service
        .post("users", {
          email: user.email,
          password: user.password,
          name: user.name
        })
        .then(
          response => {
            commit("registerSuccess");
            return Promise.resolve(response.data);
          },
          error => {
            commit("registerFailure");
            return Promise.reject(error);
          }
        );
    },
    logout({ commit }) {
      localStorage.removeItem("user");
      commit("logout");
    }
  },
  mutations: {
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    }
  }
};
