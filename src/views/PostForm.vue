<template>
  <div class="post">
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

      <el-form-item>
        <el-button @click="createPost('post')" type="primary">Add</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        description: ""
      },
      rules: {
        title: [
          {
            required: true,
            message: "Please, enter new post title",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "Length should be 5 to 20",
            trigger: "blur"
          }
        ],
        description: [
          {
            required: true,
            message: "Please, enter new post description",
            trigger: "blur"
          },
          {
            min: 10,
            max: 100,
            message: "Length should be 10 to 100",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    createPost(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPost();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addPost() {
      this.$store.dispatch("posts/addNewPost", this.post);
    }
  }
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
