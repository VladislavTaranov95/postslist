<template>
  <div class="list">
    <div v-if="isArrayPosts" class="list__posts">
      <post-item
        v-for="post in array"
        :key="post._id"
        class="post"
        :post="post"
        @remove="deletePost"
      >
      </post-item>
    </div>
  </div>
</template>

<script>
import PostItem from "@/views/PostItem";

export default {
  components: {
    PostItem,
  },
  props: {
    array: {
      type: Array,
      default: () => [],
    },
    isArrayPosts: {
      type: Boolean,
      default: false,
    },
    isArrayUsers: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 20px;
}
</style>