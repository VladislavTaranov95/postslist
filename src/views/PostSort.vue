<template>
  <div>
    <el-select
      v-model="orderBy"
      @change="changeOption"
      filterable
      placeholder="Sort by..."
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.name"
      >
        {{ option.name }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      orderBy: "Sort by...",
      options: [
        { value: "title", name: "By title" },
        { value: "description", name: "By description" },
      ],
    };
  },
  methods: {
    ...mapMutations({
      sortedPosts: "posts/sortedPosts",
    }),
    changeOption(value) {
      this.sortedPosts(value);
    },
  },
  computed: {},
};
</script>

<style>
</style>