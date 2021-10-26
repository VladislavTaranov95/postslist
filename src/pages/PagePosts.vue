<template>
  <div>
    <base-list :array="posts" :isArrayPosts="true"></base-list>
  </div>
</template>

<script>
import BaseList from "@/views/BaseList";
import { mapActions, mapState } from "vuex";

export default {
  name: "PagePosts",
  components: {
    BaseList,
  },
  methods: {
    ...mapActions({
      loadPosts: "posts/fetchPosts",
    }),
  },
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
    }),
  },
  mounted() {
    this.loadPosts();
  },
};
</script>

<style scoped>
</style>
