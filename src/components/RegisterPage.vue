<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-sm">
      <h1 class="text-3xl font-bold mb-6 text-blue-800">Register</h1>
      <form @submit.prevent="registerUser" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block font-bold mb-2" for="name">Name</label>
          <input class="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" name="name" v-model="name" required>
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2" for="email">Email</label>
          <input class="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="email" name="email" v-model="email" required>
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2" for="username">Username</label>
          <input class="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="text" name="username" v-model="username" required>
        </div>
        <div class="mb-4">
          <label class="block font-bold mb-2" for="password">Password</label>
          <input class="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" type="password" name="password" v-model="password" required>
        </div>
        <div class="mb-6">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full" type="submit">
            Register
          </button>
        </div>
        <div v-if="error" class="text-red-500 text-sm italic">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios'
    export default {
      data() {
        return {
          username: '',
          password: '',
          name:'',
          email:''
        };
      },
     
      methods: {
        async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/users', {
          username: this.username,
          password: this.password,
          name:this.name,
          email:this.email
        });
        console.log(response.data);
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
      },
    };
  </script>
  
  <style>
  /* Add Tailwind CSS styles here */
  </style>
  