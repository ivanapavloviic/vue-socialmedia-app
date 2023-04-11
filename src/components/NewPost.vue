<template>
  <div class="flex items-start px-4 py-3 border-b border-gray-200">
    <img
      class="w-10 h-10 rounded-full mr-3"
      src="../../src/assets/user.jpg"
      alt="User avatar"
    >
    <div class="flex-1">
      <textarea
        v-model="post.content"
        class="w-full py-2 text-gray-700 leading-tight focus:outline-none resize-none"
        rows="2"
        placeholder="What's happening?"
      ></textarea>
      <div class="flex justify-between items-center mt-3">
        <div>
          <button
            v-if="post.content.length > 0"
            type="button"
            class="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-2 font-medium"
            @click="createPost"
          >
            Tweet
          </button>
          <button
            v-else
            type="button"
            class="bg-blue-500 opacity-50 text-white rounded-full px-6 py-2 font-medium cursor-not-allowed"
            disabled
          >
            Tweet
          </button>
        </div>
      
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      post: {
        userId: 1, 
        title: '',
        content: '',        
        createdAt: '',
      },
    };
  },
  methods: {
    createPost() {
      this.post.createdAt = new Date().toISOString();
      this.$emit('createPost', this.post);
      this.post.title = '';
      this.post.content = '';
    },
  },
};
</script>
