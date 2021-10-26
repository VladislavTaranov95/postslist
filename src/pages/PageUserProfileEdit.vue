<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/profile' }">Back</el-breadcrumb-item>
      <el-breadcrumb-item>Edit profile</el-breadcrumb-item>
    </el-breadcrumb>
    <br />
    <el-form
      ref="editModel"
      :model="editModel"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="Name" prop="name">
        <el-input v-model="editModel.name"></el-input>
      </el-form-item>
      <el-form-item label="Profession" prop="profession">
        <el-input v-model="editModel.profession"></el-input>
      </el-form-item>
      <el-form-item label="Skills" prop="skills">
        <div v-if="editModel.skills.length">
          <el-tag
            v-for="tag in editModel.skills"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="deleteTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
        <div v-else>
          <div>None</div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="selectTag"
          size="mini"
          v-for="tag in skillTags"
          :key="tag"
        >
          {{ tag }}
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('editModel')"
          >Save</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 5,
            max: 10,
            message: "Length should be 5 to 10",
            trigger: "blur",
          },
        ],
      },
      skillTags: [
        "JavaScript",
        "Vue",
        "React",
        "Angular",
        "Node.js",
        "Express",
        "Python",
        "Django",
        "Git",
        "HTML",
        "CSS",
        "SCSS",
        "SASS",
        "LESS",
        "Electron",
      ],
      editModel: {
        profession: "",
        name: "",
        skills: [],
      },
    };
  },
  methods: {
    selectTag(event) {
      this.editModel.skills.push(event.target.innerText);
      this.skillTags = this.skillTags.filter(
        (tag) => tag !== event.target.innerText
      );
    },
    deleteTag(deletedTag) {
      this.editModel.skills = this.editModel.skills.filter(
        (tag) => tag !== deletedTag
      );
      this.skillTags.push(deletedTag);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveUserProfile();
        } else {
          ElMessage.error({
            center: true,
            message: "Invalid data!",
          });
          return false;
        }
      });
    },
    saveUserProfile() {
      this.$store
        .dispatch("auth/saveProfile", {
          name: this.editModel.name,
          profession: this.editModel.profession,
          skills: this.editModel.skills.join(),
        })
        .then(
          () => {
            this.$router.push("/profile");
            ElMessage.success({
              center: true,
              message: "Profile updated!",
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
  computed: {
    ...mapGetters({
      userInfo: "auth/getUser",
    }),
    getSkills() {
      const skills = this.userInfo.skills;

      if (skills) {
        return skills.split(",");
      }
      return false;
    },
  },
  mounted() {
    if (this.getSkills) {
      this.editModel.skills = [...this.getSkills];
    }

    this.editModel.name = this.userInfo.name;

    if (this.userInfo.profession) {
      this.editModel.profession = this.userInfo.profession;
    }

    this.skillTags = this.skillTags.filter((el) => {
      return this.editModel.skills.indexOf(el) === -1;
    });
  },
};
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}
</style>