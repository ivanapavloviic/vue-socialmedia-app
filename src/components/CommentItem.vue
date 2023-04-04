<template>
  <div>
    <div v-if="!editing">
      <p>{{ comment.content }}</p>
      <button @click="editing = true">Edit</button>
      <button @click="$emit('deleteComment', comment.id)">Delete</button>
    </div>
    <div v-else>
      <textarea v-model="updatedContent"></textarea>
      <button @click="saveComment">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      updatedContent: this.comment.content,
    };
  },
  methods: {
    saveComment() {
      this.$emit('updateComment', {
        ...this.comment,
        content: this.updatedContent,
      });
      this.editing = false;
    },
    cancelEdit() {
      this.editing = false;
      this.updatedContent = this.comment.content;
    },
  },
};
</script>
