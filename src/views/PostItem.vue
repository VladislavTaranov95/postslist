<template>
  <div class="post">
    <el-card>
      <template #header>
        <h2>{{ post.title }}</h2>
      </template>
      <div>{{ post.description }}</div>
      <div class="post__footer">
        <div class="post__likes">
          <div @click="setPostLike">
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
import { ElMessage } from "element-plus";
import { mapGetters } from "vuex";

export default {
  name: "PostItem",
  props: {
    post: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    openPost() {
      this.$router.push(`/post/${this.post._id}`);
    },
    async deletePost() {
      try {
        await this.$store.dispatch("posts/deletePost", this.post._id);
        ElMessage.success({
          center: true,
          message: "Post has been deleted.",
        });
      } catch (error) {
        ElMessage.error({
          center: true,
          message: error,
        });
      }
    },
    setPostLike() {
      const payload = {
        userId: this.userInfo._id,
        postId: this.post._id,
      };

      this.$store.dispatch("posts/setLikeToPost", payload).then(
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
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/getUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 15px;
  text-align: left;

  &__footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  &__likes {
    display: flex;
    align-items: flex-end;

    & img {
      &:hover {
        opacity: 0.8;
        cursor: pointer;
      }
    }
  }
}
</style>