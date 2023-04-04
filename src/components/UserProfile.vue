<template>
    <div class="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-8">
      <h2 class="text-2xl font-bold mb-6">User Profile</h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="userId">User ID</label>
        <input
          :value="user.id"
          id="userId"
          disabled
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Username</label>
        <input
          :value="user.username"
          id="email"
          disabled
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <!-- Add more fields as needed -->
    </div>
  </template>
  
  
  <script>
  export default {
    props: {
      userId: {
        type: Number,
        required: true,
      },
    },
    computed: {
      user() {
        return this.$store.state.posts.users.find(user => user.id === this.userId) || {};
      },
    },
    created() {
      this.$store.dispatch('fetchUsers');
    },
  };
  </script>
  