<template>
  <div class="post">
    <div><strong>Title:</strong> {{ post.title }}</div>
    <div><strong>Description:</strong> {{ post.description }}</div>
    <div class="post-btn">
      <el-button type="danger" @click="$emit('remove', post._id)" plain
        >Delete</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.post-btn {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
