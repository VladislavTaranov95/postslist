<template>
  <div class="post">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <h2>{{ post.title }}</h2>
        </div>
      </template>
      <div class="text item">{{ post.description }}</div>
      <div class="post__footer">
        <div class="post__likes">
          <div @click="setLike">
            <img style="width: 28px; height: 28px" src="@/assets/like.png" />
          </div>
          <div style="margin-right: 10px">
            {{ post && post.likes.length }}
          </div>
        </div>
        <div class="post-btn">
          <el-button @click="$router.push(`/post/${this.post._id}`)" plain
            >Open</el-button
          >
          <el-button
            v-if="post.postedBy === userInfo._id"
            type="danger"
            @click="$emit('remove', post._id)"
            plain
          >
            Delete
          </el-button>
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
