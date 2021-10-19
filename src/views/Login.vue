<template>
  <div>
    <el-form
      ref="user"
      :rules="rules"
      :model="user"
      class="login-form"
      label-width="120px"
    >
      <el-form-item label="Email: " prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="Password: " prop="password">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm('user')" type="primary"
          >Sign In</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please, enter your email",
            trigger: "blur",
          },
          {
            type: "email",
            message: "Please input correct email address",
            trigger: ["blur", "change"],
          },
        ],
        password: [
          {
            required: true,
            message: "Please, enter your password",
            trigger: "blur",
          },
          {
            min: 5,
            max: 16,
            message: "Length should be 5 to 16",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.authInfo.isAuth;
    },
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          ElMessage.error({
            center: true,
            message: "No valid data!",
          });
          return false;
        }
      });
    },
    login(e) {
      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/");
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
};
</script>

<style scope>
.login-form {
  margin: 0 auto;
  margin-top: 30px;
  width: 400px;
}
</style>
