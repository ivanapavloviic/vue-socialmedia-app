<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-sm">
        <h1 class="text-3xl font-bold mb-6">Register</h1>
        <form @submit.prevent="registerUser">
          <div class="mb-4">
            <label class="block font-bold mb-2" for="username">Name</label>
            <input class="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" v-model="username" required>
          </div>
       
          <div class="mb-4">
            <label class="block font-bold mb-2" for="password">Password</label>
            <input class="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" v-model="password" required>
          </div>
          <div class="mb-6">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
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
        };
      },
     
      methods: {
        async registerUser() {
      try {
        const response = await axios.post('http://localhost:3000/users', {
          username: this.username,
          password: this.password
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
  