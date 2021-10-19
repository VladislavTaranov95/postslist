<template>
  <div>
    <div class="container">
      <post-item
        class="post"
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="deletePost"
      >
      </post-item>
    </div>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
import { ElMessage } from "element-plus";
import { mapState } from "vuex";

export default {
  components: { PostItem },
  data() {
    return {};
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch("posts/deletePost", id).then(
        () => {
          ElMessage.success({
            center: true,
            message: "Post has been deleted!",
          });
        },
        (error) => {
          ElMessage.error({
            center: true,
            message: error,
          });
        }
      );
    },
  },
  mounted() {},
  computed: {
    ...mapState({
      posts: (state) => state.posts.posts,
    }),
  },
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
</style>
