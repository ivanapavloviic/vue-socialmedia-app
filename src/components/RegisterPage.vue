<template>
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="w-full max-w-sm">
        <h1 class="text-3xl font-bold mb-6">Register</h1>
        <form @submit.prevent="registerUser">
          <div class="mb-4">
            <label class="block font-bold mb-2" for="name">Name</label>
            <input class="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="text" name="name" v-model="name" required>
          </div>
          <div class="mb-4">
            <label class="block font-bold mb-2" for="email">Email</label>
            <input class="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" v-model="email" required>
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
    export default {
      data() {
        return {
          name: '',
          email: '',
          password: '',
        };
      },
      computed: {
        error() {
          return this.$store.state.register.error;
        },
      },
      methods: {
        async registerUser() {
          try {
            await this.$store.dispatch('registerUser', {
              name: this.name,
              email: this.email,
              password: this.password,
            });
            this.$router.push('/profile');
          } catch (error) {
            console.error(error);
          }
        },
      },
    };
  </script>
  
  <style>
  /* Add Tailwind CSS styles here */
  </style>
  