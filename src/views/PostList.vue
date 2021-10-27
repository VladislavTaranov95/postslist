<template>
  <div>
    <div class="posts__header" v-if="loggedIn">
      <post-form></post-form>
      <div class="main__filter">
        <el-dropdown style="margin-right: 15px">
          <span class="el-dropdown-link">
            Filter<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <el-checkbox
                  v-model="filterByUser"
                  label="By my posts"
                  @change="useFilterByUserPosts"
                ></el-checkbox>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button size="mini" type="primary" @click="resetFilters"
                  >Reset filters</el-button
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <post-sort></post-sort>
      </div>
    </div>
    <post-item
      v-for="post in posts"
      :key="post._id"
      class="post"
      :post="post"
      @remove="deletePost"
    >
    </post-item>
  </div>
  <div ref="observer" class="observer"></div>
</template>

<script>
import PostItem from "./PostItem.vue";
import PostSort from "./PostSort.vue";
import PostForm from "./PostForm.vue";
import { ElMessage } from "element-plus";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: { PostItem, PostSort, PostForm },
  data() {
    return {
      isLoading: false,
      noMore: false,
      totalPosts: 0,
      filterByUser: false,
    };
  },
  methods: {
    resetFilters() {
      this.filterByUser = false;
      this.filterByLastPosts = false;
      this.resetPosts();
    },
    useFilterByUserPosts() {
      if (this.filterByUser === true) {
        this.$store.dispatch("posts/findAllPosts", this.userInfo._id);
      }
    },
    deletePost(id) {
      this.$store.dispatch("posts/deletePost", id).then(
        () => {
          ElMessage.success({
            center: true,
            message: "Post has been deleted!",
          });
        },
        (error) => {
          ElMessage.error({
            center: true,
            message: error,
          });
        }
      );
    },
    ...mapActions({
      loadMorePosts: "posts/loadMorePosts",
      getTotalPosts: "posts/getTotalPosts",
    }),
    ...mapMutations({
      setPosts: "posts/setPosts",
    }),
    async loadPosts() {
      console.log(this.totalPosts);
      if (this.posts.length < this.totalPosts) {
        this.isLoading = true;
        await this.$store.dispatch("posts/loadMorePosts").
      }
    },
    setLoadingObserver() {
      console.log(2);
      const loadingObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.loadPosts();
        }
      });

      loadingObserver.observe(this.$refs.observer);
    },
    ...mapActions({
      resetPosts: "posts/fetchPosts",
      getTotalPosts: "posts/getTotalPosts",
    }),
  },
  mounted() {
    this.getTotalPosts().then((response) => {
      this.totalPosts = response;
      this.setLoadingObserver();
    });
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.authInfo.isAuth;
    },
    ...mapState({
      posts: (state) => state.posts.posts,
    }),
    disabled() {
      console.log(this.loading);
      return this.loading || this.noMore;
    },
    ...mapGetters({
      userInfo: "auth/getUser",
    }),
  },
};
</script>

<style lang="scss" scoped>
.post {
  margin-top: 15px;
  padding: 15px;
}

.infinite-list-wrapper {
  padding: 0;
  margin: 0;
  list-style: none;

  .list {
    padding: 0;
    margin: 0;
    list-style: none;
  }
}

.posts {
  &__header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
