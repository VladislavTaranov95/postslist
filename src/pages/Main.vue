<template>
  <div class="main" v-if="loggedIn">
    <post-form></post-form>
    <post-sort
      @updateModelValue="setSelectedSort"
      :options="options"
    ></post-sort>
  </div>

  <post-list :posts="sortedPosts"></post-list>

  <div ref="observer" class="observer"></div>
</template>

<script>
import PostForm from "@/views/PostForm";
import PostList from "@/views/PostList";
import PostSort from "@/views/PostSort";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    PostForm,
    PostList,
    PostSort,
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
      options: (state) => state.posts.options,
      posts: (state) => state.posts.posts,
    }),
  },
  methods: {
    ...mapActions({
      fetchPosts: "posts/fetchPosts",
      loadMorePosts: "posts/loadMorePosts",
    }),
    ...mapMutations({
      setSelectedSort: "posts/setSelectedSort",
      sortedPosts: "posts/sortedPosts",
    }),
  },
  mounted() {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting) {
        this.loadMorePosts();
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  },
};
</script>

<style>
.app__btn-create-post {
}

.observer {
  height: 50px;
}

.main {
  display: flex;
  justify-content: space-between;
}
</style>
