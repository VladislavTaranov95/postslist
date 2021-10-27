<template>
  <div>
    <base-list :array="posts">
      <post-item v-for="post in posts" :key="post._id" :post="post">
      </post-item>
    </base-list>
  </div>
</template>

<script>
import BaseList from "@/views/BaseList";
import PostItem from "@/views/PostItem";
import { mapActions, mapState } from "vuex";

export default {
  name: "PagePosts",
  components: {
    BaseList,
    PostItem,
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
