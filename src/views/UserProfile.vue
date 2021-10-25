<template>
  <div class="user">
    <div class="user__avatar">
      <img v-if="userAvatar" :src="userAvatar" />
    </div>
    <div class="user__info">
      <div class="info">
        <div class="info__fields">
          <div class="info__name">Name: {{ userInfo.name }}</div>
          <el-divider></el-divider>
          <div class="info__email">Email: {{ userInfo.email }}</div>
          <el-divider></el-divider>
          <div class="info__email">Profession: {{ userInfo.profession }}</div>
          <el-divider></el-divider>
          <div class="info__skills">
            <div class="skills__title">Skills:</div>
            <div>
              <el-tag
                v-for="tag in userSkills"
                :key="tag"
                :disable-transitions="false"
                @close="handleClose(tag)"
                class="skill___tag"
              >
                {{ tag }}
              </el-tag>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="info__email">Registration date: {{ newDate }}</div>
        </div>
        <div class="info__btns">
          <el-button type="primary" icon="el-icon-edit" @click="editProfile"
            >Edit</el-button
          >
          <el-button type="danger" icon="el-icon-delete">Delete</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userSkills: [],
      newDate: "",
    };
  },
  methods: {
    editProfile() {
      this.$router.push("/profile/edit");
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "auth/getUser",
      userAvatar: "auth/getUserAvatar",
    }),
  },
  mounted() {
    if (this.userInfo.skills) this.userSkills = this.userInfo.skills.split(",");

    this.newDate = new Date(this.userInfo.dateCreated).toLocaleString();
  },
};
</script>

<style scoped>
.user {
  display: flex;
}

.user__avatar {
  margin-right: 15px;
}

.user__avatar img {
  width: 200px;
  height: 200px;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}

.info__btns {
  margin-top: 15px;
  text-align: right;
}

.skills__title {
  margin-bottom: 10px;
}

.el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>