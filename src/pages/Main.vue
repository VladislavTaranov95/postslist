<template>
  <div>
    <post-list></post-list>
  </div>
</template>

<script>
import PostList from "@/views/PostList";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    PostList,
  },
  methods: {
    ...mapActions({
      getUserById: "auth/getUserById",
      getTotalUsers: "posts/getTotalUsers",
      getAllUsers: "posts/getAllUsers",
    }),
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.authInfo.isAuth;
    },
    getSelectedSort() {
      console.log(this.$store.state.posts.selectedSort);
      return this.$store.state.posts.selectedSort;
    },
    ...mapState({
      selectedSort: (state) => state.posts.selectedSort,
      posts: (state) => state.posts.posts,
    }),
  },
  mounted() {
    this.getTotalUsers().then((response) => {
      this.getAllUsers();
    });
  },
};
</script>

<style>
.app__btn-create-post {
}

.observer {
  height: 50px;
  border: 1px solid black;
}

.main {
  display: flex;
  justify-content: space-between;
}

.radiotag {
  cursor: pointer;
}

.main__filter {
  display: flex;
  align-items: flex-end;
}
</style>
