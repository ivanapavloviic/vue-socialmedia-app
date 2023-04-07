<template>
  <form @submit.prevent="addComment" class="flex items-end">
    <textarea v-model="content" placeholder="Add a comment" class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mr-2" rows="3"></textarea>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Submit</button>
    <div v-if="user" class="text-gray-500 ml-2">{{ user.username }}</div>
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
  computed: {
    user() {
      return this.$store.state.login.user;
    },
  },
  methods: {
    addComment() {
      console.log(this.user)
      this.$emit('addComment', {
        postId: this.postId,
        content: this.content,
        userId: this.user.id, 
        username:this.user// add userId to the comment
      });
      this.content = '';
    },
  },
};
</script>
