<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: `/post/${this.postModel._id}` }"
        >Back</el-breadcrumb-item
      >
      <el-breadcrumb-item>Edit profile</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="edit__form">
      <el-form
        ref="postModel"
        :model="postModel"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Title" prop="title">
          <el-input v-model="postModel.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="postModel.description"></el-input>
        </el-form-item>
        <el-form-item label="FullText" prop="fullText">
          <el-input v-model="postModel.fullText"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePost">Save</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      postModel: {
        title: "",
        description: "",
        fullText: "",
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please input title",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please input description",
            trigger: "blur",
          },
        ],
        fullText: [
          {
            required: true,
            message: "Please input something",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      getPost: "posts/getPostById",
    }),
    savePost() {
      this.$store.dispatch("posts/savePost", this.postModel).then(
        () => {
          this.$router.push(`/post/${this.postModel._id}`);
          ElMessage.success({
            center: true,
            message: "Post updated!",
          });
        },
        (error) => {
          ElMessage.error({
            center: true,
            message: error.response.data.error,
          });
        }
      );
    },
  },
  mounted() {
    this.getPost(this.$route.params.id).then(
      (response) => (this.postModel = response.data)
    );
  },
};
</script>

<style scoped>
.edit__form {
  margin-top: 15px;
}
</style>