<template>
  <div>
    <el-select
      v-model="setSelectedSort"
      @change="changeOption"
      filterable
      placeholder="Sort by..."
    >
      <el-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  methods: {
    changeOption(value) {
      this.$emit("updateModelValue", value);
    },
    ...mapMutations({
      setSelectedSort: "posts/setSelectedSort",
    }),
  },
  computed: {
    ...mapState({
      options: (state) => state.posts.options,
    }),
  },
};
</script>

<style>
</style>