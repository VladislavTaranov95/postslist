<template>
  <div class="post">
    <div class="app__btn-create-post">
      <el-button type="primary" plain @click="showDialog">Add post</el-button>
    </div>

    <el-dialog v-model="dialogVisible" title="Create new post" width="30%">
      <el-form ref="post" :rules="rules" :model="post" label-width="120px">
        <el-form-item class="post__input" label="Title: " prop="title">
          <el-input v-model="post.title" placeholder="Title" />
        </el-form-item>

        <el-form-item
          class="post__input"
          label="Description: "
          prop="description"
        >
          <el-input v-model="post.description" placeholder="Description" />
        </el-form-item>

        <el-form-item class="post__input" label="Fulltext: " prop="fullText">
          <el-input v-model="post.fullText" placeholder="Fulltext" />
        </el-form-item>

        <el-form-item>
          <el-button @click="createPost('post')" type="primary">Add</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        description: "",
        fullText: "",
      },
      dialogVisible: false,
      rules: {
        title: [
          {
            required: true,
            message: "Please, enter new post title",
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: "Length should be 5 to 20",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please, enter new post description",
            trigger: "blur",
          },
          {
            min: 10,
            max: 100,
            message: "Length should be 10 to 100",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    createPost(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addPost();
          this.hideDialog();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addPost() {
      this.$store.dispatch("posts/addNewPost", this.post);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.post__input {
  margin-bottom: 15px;
}
</style>
