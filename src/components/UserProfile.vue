<template>
    <div class="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 class="text-2xl font-bold mb-6 text-blue-800">User Profile</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="userId">User ID</label>
        <input
          :value="user.id"
          id="userId"
          disabled
          class="bg-gray-100 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
        <input
          :value="user.username"
          id="username"
          disabled
          class="bg-gray-100 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
        <input
          :value="user.email"
          id="email"
          disabled
          class="bg-gray-100 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Name</label>
        <input
          :value="user.name"
          id="email"
          disabled
          class="bg-gray-100 shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    
  
    </div>
    <post-item
      v-for="post in filteredPosts"
      :key="post.id"    
      :post="post"
      @deletePost="deletePost"
      @updatePost="updatePost"
    ></post-item>
  </template>
  
  
  <script>
  import PostItem from './PostItem.vue'
  export default {
    components:{
        PostItem
    },
    props: {
      userId: {
        type: Number,
        required: true,
      },
    },
    
    computed: {
        posts() {
      return this.$store.state.posts.posts;
    },
      user() {
        return this.$store.state.posts.users.find(user => user.id === this.userId) || {};
      },
      filteredPosts() {
   
      return this.posts.filter(post => post.userId === this.userId);
    },
    },
    created() {
      this.$store.dispatch('fetchUsers');
    },
    methods:{
        deletePost(postId) {
      this.$store.dispatch('deletePost', postId);
    },
  
    updatePost(post) {
    this.$store.dispatch('updatePost', post);
  },
    }
  };
  </script>
  