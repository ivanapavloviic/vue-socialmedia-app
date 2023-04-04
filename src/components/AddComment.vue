<template>
    <form @submit.prevent="addComment">
      <textarea v-model="content" placeholder="Add a comment"></textarea>
      <button type="submit">Submit</button>
    </form>
  </template>
  
  <script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true,
      },
    },
    data() {
      return {
        content: '',
      };
    },
    methods: {
      addComment() {
        this.$emit('addComment', {
          postId: this.postId,
          content: this.content,
        });
        this.content = '';
      },
    },
  };
  </script>
  