<template>
  <div class="flex flex-col items-center justify-center bg-gray-100 min-h-screen">
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-blue-500">Create your account</h1>
      <form @submit.prevent="registerUser" class="space-y-6">
        <div>
          <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
          <input v-model="name" type="text" name="name" id="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div>
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input v-model="email" type="email" name="email" id="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div>
          <label for="username" class="block text-gray-700 font-bold mb-2">Username</label>
          <input v-model="username" type="text" name="username" id="username" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div>
          <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
          <input v-model="password" type="password" name="password" id="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required>
        </div>
        <div>
          <button type="submit" class="w-full py-3 px-4 text-white font-bold bg-blue-500 hover:bg-blue-600 rounded-lg focus:outline-none focus:shadow-outline">
            Create account
          </button>
        </div>
        <div v-if="error" class="text-red-500 italic">{{ error }}</div>
      </form>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios'
  import { API_URL } from "../../src/.env.js";

    export default {
      data() {
        return {
          username: '',
          password: '',
          name:'',
          email:'',
          error:''
        };
      },
     
      methods: {
        async registerUser() {
  try {
   
    const response = await axios.post(`${API_URL}/users`, {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email
    });
    console.log(response)
   
    this.$router.push('/login');
  } catch (error) {

    if (error.response && error.response.status === 409) {
      this.error = 'User already exists';
    } else {
      this.$showToast('An error occurred while trying to signup. Please try again later.', 'error');
    }
  }
}
      }
    };
  </script>
  
  <style>
  /* Add Tailwind CSS styles here */
  </style>
  