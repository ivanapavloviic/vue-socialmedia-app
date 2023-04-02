<template>
  <nav class="bg-white border-b border-gray-300 fixed w-full z-10 top-0">
    <div class="container mx-auto flex justify-between items-center py-4">
      <div class="flex items-center">
        <router-link to="/" class="font-bold text-lg text-blue-500">Home</router-link>
      </div>
      <div class="flex items-center">
        <template v-if="isLoggedIn">
          <button @click="logout" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-gray-700 font-bold py-2 px-4 hover:text-blue-500">Login</router-link>
          <router-link to="/signup" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Signup</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>
  
  
  <script>
 export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn && this.$store.state.user !== null;
  }
  },
  // watch: {
  //   isLoggedIn() {
  //     this.$forceUpdate();
  //   }
  // },
  methods: {
    logout() {
    this.$store.commit('SET_USER_DATA', null);
    this.$store.commit('SET_LOGIN_STATUS', false);
    this.$router.push('/login');
  }
  }
};
</script>
  