<template>
  <div class="flex justify-center items-center h-screen">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <h1 class="font-bold text-2xl mb-6">Log in to your account</h1>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="username">
            Username
          </label>
          <input
            v-model="username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          >
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
          >
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div class="flex items-center justify-between">
          <button
            @click.prevent="login"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Log in
          </button>
          <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
    return {
      username: '',
      password: '',
      error:''
    };
  },
  methods: {
    async login() {
  try {
    const response = await axios.get('http://localhost:3000/users', {
      params: {
        username: this.username,
        password: this.password
      }
    });
    if (response.data.length > 0) {
      this.$store.commit('SET_LOGIN_STATUS', true);
      this.$store.commit('SET_USER_DATA', response.data[0]);
      this.$store. commit('SET_USER', this.username);
      this.$router.push('/home');
    } else {
      this.error = 'Invalid username or password';
    }
  } catch (error) {
    console.error(error);
  }
    }}
};
</script>

<style scoped>
  /* custom styles */
</style>
