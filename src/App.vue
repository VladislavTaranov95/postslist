<template>
  <div id="#app">
    <nav class="header">
      <div class="header__section">
        <router-link style="border-right: 1px solid #bbb" to="/"
          >Home</router-link
        >
      </div>
      <div v-if="!loggedIn">
        <router-link to="/login">Sign In</router-link>
        <router-link to="/register">Sign Up</router-link>
      </div>
      <div class="profile" v-else>
        <div class="profile__username">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
              Welcome, {{ currentUser
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="profile__menu">
                <el-dropdown-item>
                  <div class="profile__avatar">
                    <img
                      v-if="getUserAvatar"
                      :src="getUserAvatar"
                      class="avatar"
                    />
                    <input
                      type="file"
                      name="import_file"
                      v-on:change="selectedFile($event)"
                    />
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="profile__menu-btn-profile">
                  <router-link to="/profile">Your profile</router-link>
                </el-dropdown-item>
                <el-dropdown-item command="logOut" divided
                  >Sign Out</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      imageUrl: "",
    };
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logOut": {
          this.logOut();
          break;
        }
      }
    },
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    async selectedFile(event) {
      const formData = new FormData();
      formData.append("avatar", event.target.files[0]);
      try {
        await this.editUserPhoto(formData);
      } catch (e) {
        this.message = e.response.data.error.message;
      }
    },
    ...mapActions({
      editUserPhoto: "auth/editUserPhoto",
    }),
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
      loadMorePosts: "posts/loadMorePosts",
    }),
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.authInfo.isAuth;
    },
    currentUser() {
      return this.$store.state.auth.authInfo.userInfo.name;
    },
    getUserAvatar() {
      return (
        "http://51.158.179.21" + this.$store.state.auth.authInfo.userInfo.avatar
      );
    },
  },
  mounted() {},
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
  width: 800px;
  margin: 0 auto;
}

nav {
  margin-bottom: 20px;
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

.profile__menu {
  text-align: center;
}

.profile__avatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.profile__avatar input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.profile__menu-btn-profile {
  margin-top: 20px;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader-icon {
  font-size: 74px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
