<template>
  <div>
    <div class="comment__form">
      <el-button type="primary" @click="addComment">Add comment</el-button>
    </div>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%">
      <el-form
        ref="comment"
        :rules="rules"
        :model="comment"
        label-width="120px"
      >
        <el-form-item class="post__input" label="Text: " prop="text">
          <el-input v-model="comment.text" placeholder="Enter comment..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addComment">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      comment: {
        text: "",
      },
    };
  },
  methods: {
    addComment() {
      this.dialogVisible = true;
    },
    hideDialog() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
</style>