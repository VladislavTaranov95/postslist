<template>
  <div>
    <router-link :to="route.navTo">{{ route.name }}</router-link>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang='scss' scoped>
a {
  text-decoration: none;
  color: black;
  margin-right: 10px;
}
</style>