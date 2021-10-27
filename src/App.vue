<template>
  <div id="#app">
    <base-nav :navHeader="true">
      <div>
        <base-router-link
          :navHeaderLink="true"
          :route="{ navTo: '/', name: 'Home' }"
        ></base-router-link>
      </div>
      <div v-if="!logStatus" class="nav-header__items-right">
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
      <div v-else class="profile">
        <div class="profile__username">
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="profile__title">
              Welcome, {{ userName }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="profile__menu">
                <el-dropdown-item>
                  <div class="profile__avatar">
                    <img
                      v-if="userAvatar"
                      :src="userAvatar"
                      style="width: 100px; height: 100px"
                    />
                    <input
                      type="file"
                      name="import_file"
                      v-on:change="selectedFile($event)"
                    />
                  </div>
                </el-dropdown-item>
                <el-dropdown-item class="profile__menu-btn-profile">
                  <base-router-link
                    :navHeaderLink="true"
                    :route="{ navTo: '/profile', name: 'Your profile' }"
                    >Your profile</base-router-link
                  >
                </el-dropdown-item>
                <el-dropdown-item command="logOut" divided
                  >Sign Out</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
  },
  computed: {
    ...mapGetters({
      logStatus: "auth/getUserLogStatus",
      userName: "auth/getUserName",
      userAvatar: "auth/getUserAvatar",
    }),
  },
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

  &__title {
    cursor: pointer;
    color: black;
  }

  &__username {
    padding: 8px 16px;
  }

  &__menu {
    text-align: center;

    &-btn-profile {
      margin-top: 20px;
    }
  }

  &__avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & input {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
}
</style>
