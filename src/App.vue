<template>
  <div id="#app">
    <base-nav :navHeader="true">
      <div>
        <base-router-link
          :navHeaderLink="true"
          :route="{ navTo: '/', name: 'Home' }"
        ></base-router-link>
      </div>
      <div class="nav-header__items-right">
        <base-router-link
          :navHeaderLink="true"
          :route="{ navTo: '/login', name: 'Sign In' }"
        ></base-router-link>
        <base-router-link
          :navHeaderLink="true"
          :route="{ navTo: '/register', name: 'Sign Up' }"
        >
        </base-router-link>
      </div>
    </base-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import BaseNav from "./views/BaseNav";
import BaseRouterLink from "./views/BaseRouterLink.vue";

export default {
  components: {
    BaseNav,
    BaseRouterLink,
  },
  methods: {
    profileCommandHandler(command) {
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
    ...mapGetters({
      logStatus: "auth/getUserLogStatus",
      userName: "auth/getUserName",
    }),
    getUserAvatar() {
      return (
        "http://51.158.179.21" + this.$store.state.auth.authInfo.userInfo.avatar
      );
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
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

.nav-header {
  box-shadow: 0px 5px 19px 0px rgba(34, 60, 80, 0.2);
  &__items {
    &-right {
      display: flex;
    }
  }
}

.profile {
  display: flex;

  &__username {
    padding: 8px 16px;
  }

  &__menu {
    text-align: center;
  }

  &__avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.profile__avatar input {
  margin-top: 10px;
  margin-bottom: 10px;
}

.profile__menu-btn-profile {
  margin-top: 20px;
}

.profile__link {
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
