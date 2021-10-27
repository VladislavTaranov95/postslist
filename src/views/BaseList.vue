<template>
  <div class="base-list">
    <base-list-item
      v-for="item in array"
      :key="item._id"
      :item="item"
      :type="'posts'"
    >
    </base-list-item>
  </div>
</template>

<script>
import BaseListItem from "@/views/BaseListItem";

export default {
  components: {
    BaseListItem,
  },
  props: {
    array: {
      type: Array,
      default: () => [],
    },
    list: {
      type: String,
      default: "None",
    },
  },
};
</script>

<style lang="scss" scoped>
.base-list {
  margin-top: 20px;
}
</style>