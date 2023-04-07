<template>
  <form @submit.prevent="createPost" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
      <input v-model="post.title" id="title" type="text" placeholder="Post title" class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Content</label>
      <textarea v-model="post.content" id="content" placeholder="Post content" class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows="6"></textarea>
    </div>
    <div class="flex items-center justify-between">
      <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Create Post</button>
    </div>
  </form>
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
