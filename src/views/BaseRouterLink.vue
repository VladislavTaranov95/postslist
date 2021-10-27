<template>
  <div>
    <router-link :class="className" :to="route.navTo">{{
      route.name
    }}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      default: () => {},
    },
    navHeaderLink: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        "nav-header-link": this.navHeaderLink,
      };
    },
  },
};
</script>

<style lang='scss' scoped>
.nav-header-link {
  text-decoration: none;
  color: black;
  margin-right: 10px;
}
</style>