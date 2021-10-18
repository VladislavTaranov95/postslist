<template>
  <div class="container">
    <div class="post" v-for="post in posts" :key="post.id">
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Description:</strong> {{ post.description }}</div>
      <div class="post-btn">
        <el-button type="danger" plain>Delete</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchPosts: "posts/fetchPosts"
    })
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    ...mapState({
      posts: state => state.posts.posts
    })
  }
};
</script>

<style scoped>
.container {
  width: 800px;
  margin: 0 auto;
  text-align: center;
}

.post-list {
  margin-top: 40px;
}

.post {
  margin-top: 15px;
  border-radius: 5px;
  border: 1px solid grey;
  padding: 15px;
}

.post-btn {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
