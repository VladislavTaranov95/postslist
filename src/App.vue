<template>
  <div id="app">
    <nav class="header">
      <div class="header__section">
        <router-link style="border-right: 1px solid #bbb;" to="/"
          >Home</router-link
        >
      </div>
      <div v-if="!loggedIn">
        <router-link to="/login">Sign In</router-link>
        <router-link to="/register">Sign Up</router-link>
      </div>
      <div class="profile" v-else>
        <div class="profile__username">Welcome, {{ currentUser }}</div>
        <a href="" @click="logOut">Sign Out</a>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user.data.name;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 8px 0px rgba(34, 60, 80, 0.2);
}

.header a {
  text-decoration: none;
  color: black;
  padding: 8px 16px;
}

.header__section {
  width: 100px;
  display: flex;
  justify-content: space-between;
}

.profile {
  display: flex;
}

.profile__username {
  padding: 8px 16px;
}
</style>
