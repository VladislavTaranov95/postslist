<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">Back</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
  </el-breadcrumb>
  <div v-if="!post" v-loading="isLoading"></div>
  <div v-else>
    <el-card>
      <template #header>
        <div>
          <h2>{{ post.title }}</h2>
          <div>{{ post.description }}</div>
        </div>
      </template>
      <div style="margin-bottom: 20px">{{ post.fullText }}</div>
      <div style="text-align: right">
        {{ new Date(post.dateCreated).toLocaleString() }}
      </div>
      <div v-if="post.postedBy === userInfo._id">
        <el-button type="primary" @click="editPost">Edit</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      isLoading: false,
      post: null,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/getUser",
    }),
  },
  mounted() {
    this.isLoading = true;
    this.$store.dispatch("posts/getPostById", this.$route.params.id).then(
      (response) => {
        this.post = response.data;
        this.isLoading = false;
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
  },
};
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>