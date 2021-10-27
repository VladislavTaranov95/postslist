<template>
  <div class="base-nav">
    <nav :class="className">
      <slot></slot>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    navHeader: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      logStatus: "auth/getUserLogStatus",
    }),
    className() {
      return {
        "nav-header": this.navHeader,
      };
    },
  },
  methods: {},
};
</script>

<style lang='scss' scoped>
.nav-header {
  height: 50px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &-left {
    display: flex;
  }
}
</style>