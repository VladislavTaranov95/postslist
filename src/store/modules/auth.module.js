import service from "@/helpers/api";

// const user = ;
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));
const info =
  user && token
    ? { isAuth: true, userInfo: user }
    : { isAuth: false, userInfo: null };
const BASE_URL = "http://51.158.179.21"

export const auth = {
  namespaced: true,
  state: {
    authInfo: info,
  },
  getters: {
    getUserLogStatus: state => {
      return state.authInfo.isAuth;
    },
    getUserName: state => {
      return state.authInfo.userInfo.name;
    },
    getUser: state => {
      return state.authInfo.userInfo
    },
    getUserAvatar: state => {
      return BASE_URL + state.authInfo.userInfo.avatar
    },
    getUserId: state => {
      return state.authInfo.userInfo._id
    },
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
            localStorage.setItem("token", JSON.stringify(response.data.token));
          }

          return service.get("auth/user");
        })
        .then(
          user => {
            localStorage.setItem("user", JSON.stringify(user.data));
            commit("loginSuccess", user.data);

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
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      commit("logout");
    },
    async editUserPhoto({ state, commit }, payload) {
      const response = await service.put('/users/upload/' + state.authInfo.userInfo._id, payload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      commit('updateUser', response.data)
      localStorage.setItem("user", JSON.stringify(response.data));
    },
    saveProfile({ commit, getters }, data) {
      return service
        .patch(`users/${getters.getUserId}`, {
          name: data.name,
          profession: data.profession,
          skills: data.skills
        })
        .then(
          response => {
            commit("profileSaveSuccess", response.data);
            return Promise.resolve(response.data);
          },
          error => {
            commit("profileSaveFailure");
            return Promise.reject(error);
          }
        );
    },
    async getUserById({ commit }, userId) {
      return service.get(`users/${userId}`).then(
        response => {
          return response.data;
        }
      )
    },
  },
  mutations: {
    registerSuccess(state) {
      state.authInfo.isAuth = false;
    },
    registerFailure(state) {
      state.authInfo.isAuth = false;
    },
    loginSuccess(state, user) {
      state.authInfo.isAuth = true;
      state.authInfo.userInfo = user;
    },
    loginFailure(state) {
      state.authInfo.isAuth = false;
      state.authInfo.userInfo = null;
    },
    logout(state) {
      state.authInfo.isAuth = false;
      state.authInfo.userInfo = null;
    },
    updateUser(state, user) {
      state.authInfo.userInfo = user;
    },
    profileSaveSuccess(state, data) {
      state.authInfo.userInfo = data;
      localStorage.setItem("user", JSON.stringify(data));
    }
  }
};
