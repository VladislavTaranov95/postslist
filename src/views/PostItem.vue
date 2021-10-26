<template>
  <div class="post">
    <el-card>
      <template #header>
        <h2>{{ post.title }}</h2>
      </template>
      <div>{{ post.description }}</div>
      <div class="post__footer">
        <div class="post__likes">
          <div @click="setLike">
            <img style="width: 28px; height: 28px" src="@/assets/like.png" />
          </div>
          <div style="margin-right: 10px">
            {{ post.likes.length }}
          </div>
        </div>
        <div class="post-btn">
          <el-button @click="openPost">Open</el-button>
          <el-button type="danger" @click="deletePost">Delete</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { ElMessage } from "element-plus";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post._id}`);
    },
    deletePost() {
      this.$store.dispatch("posts/deletePost", this.post._id).then(
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
    setLike() {
      const payload = {
        userId: this.userInfo._id,
        postId: this.post._id,
      };
      this.setPostLike(payload);
      this.$store.dispatch("posts/setLikeToPost", this.post._id).then(
        (response) => {
          ElMessage.success({
            center: true,
            message: "Success!",
          });
        },
        (error) => {
          ElMessage.error({
            center: true,
            message: error.error,
          });
        }
      );
      this.$emit("addLike", this.post, this.userInfo._id);
    },
    ...mapMutations({
      setPostLike: "posts/setLike",
    }),
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/getUser",
      getPost: "posts/getCurrentPost",
    }),
  },
  mounted() {},
};
</script>

<style scoped>
.post {
  text-align: left;
}

.post__footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.post__likes {
  display: flex;
  align-items: flex-end;
}

.post__likes img:hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
