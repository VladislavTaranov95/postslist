<template>
  <div class="register">
    <el-form
      class="register-form"
      ref="user"
      :rules="rules"
      :model="user"
      label-width="120px"
    >
      <el-form-item label="Username: " prop="name">
        <el-input v-model="user.name"></el-input>
      </el-form-item>
      <el-form-item label="Email: " prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Password: " prop="password">
        <el-input
          v-model="user.password"
          type="password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('user')" type="primary"
          >Sign Up</el-button
        >
      </el-form-item>

      <div v-if="message">
        <el-alert :title="message" type="error" show-icon> </el-alert>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      loading: false,
      rules: {
        name: [
          {
            required: true,
            message: "Please, enter your name",
            trigger: "blur"
          },
          {
            min: 5,
            max: 20,
            message: "Length should be 5 to 20",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "Please, enter your email",
            trigger: "blur"
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "Please, enter your password",
            trigger: "blur"
          },
          {
            min: 5,
            max: 16,
            message: "Length should be 5 to 16",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    register(e) {
      this.message = "";

      this.$store
        .dispatch("auth/register", this.user)
        .then(
          data => {},
          error => {
            this.message = error.response.data.error;
          }
        )
        .then(() => {
          this.$router.push("/login");
        });
    }
  }
};
</script>

<style scoped>
.register-form {
  margin: 0 auto;
  margin-top: 30px;
  width: 400px;
}
</style>
