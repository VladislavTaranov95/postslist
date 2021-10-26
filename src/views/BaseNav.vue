<template>
  <div>
    <nav class="header">
      <div class="header__items">
        <div v-if="!logStatus">
          <div class="header__item-left">
            <base-router-link
              :route="{ navTo: '/', name: 'Home' }"
            ></base-router-link>
            <base-router-link
              :route="{ navTo: '/login', name: 'Sign In' }"
            ></base-router-link>
            <base-router-link :route="{ navTo: '/register', name: 'Sign Up' }">
            </base-router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import BaseRouterLink from "../views/BaseRouterLink.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseRouterLink,
  },
  computed: {
    ...mapGetters({
      logStatus: "auth/getUserLogStatus",
    }),
  },
};
</script>

<style lang='scss' scoped>
.header {
  height: 50px;
  padding: 10px 15px;
  &__item {
    display: flex;
    justify-content: space-between;
    &-left {
      display: flex;
    }
  }
}
</style>