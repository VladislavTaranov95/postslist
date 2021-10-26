<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">Back</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div v-if="!post" v-loading="isLoading"></div>
  <div v-else>
    <div>
      <h2>{{ post.title }}</h2>
      <div>{{ post.description }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import { ElMessage } from "element-plus";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      post: null,
      comments: null,
      dialogVisible: false,
      comment: {
        text: "",
      },
      name: "",
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/getUser",
      getUserName: "posts/getUserName",
    }),
    ...mapState({
      users: "posts/users",
    }),
  },
  mounted() {
    this.isLoading = true;
    this.$store.dispatch("posts/getPostById", this.$route.params.id).then(
      (response) => {
        this.post = response.data;
      },
      (error) => {
        ElMessage.error({
          center: true,
          message: error.response.data.error,
        });
      }
    );
    this.$store.dispatch("posts/getPostComments", this.$route.params.id).then(
      (response) => {
        this.comments = response;
      },
      (error) => {
        ElMessage.error({
          center: true,
          message: error.response.data.error,
        });
      }
    );
  },
  methods: {
    editPost() {
      this.$router.push(`/post/edit/${this.post._id}`);
    },
    toOneLevelArray(arr) {
      return arr.reduce(
        (accum, currentVal) =>
          accum.concat(
            Array.isArray(currentVal)
              ? this.toOneLevelArray(currentVal)
              : currentVal
          ),
        []
      );
    },
    ...mapActions({
      getUserById: "auth/getUserById",
      getTotalUsers: "posts/getTotalUsers",
      getAllUsers: "posts/getAllUsers",
    }),
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}

.comments {
  margin-top: 20px;
}

.comments__item {
  margin-top: 10px;
}

.box-card {
  margin-top: 15px;
}

.item__content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.item__footer {
  display: flex;
  align-items: flex-end;
}

.footer__like {
  cursor: pointer;
}

.footer__like:hover {
  opacity: 0.8;
}

.comment__form {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid rgb(192, 192, 192);
  border-radius: 5px;
}
</style>