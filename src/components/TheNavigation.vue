<template>
  <nav class="bg-blue-500 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex-shrink-0 flex items-center">
          <router-link to="/">
            <img class="block lg:hidden h-8 w-auto" src="../../src/assets/logo.png" alt="Logo">
            <img class="hidden lg:block h-8 w-auto" src="../../src/assets/logo.png" alt="Logo">
          </router-link>
        </div>
        <div class="hidden md:flex md:items-center md:ml-6"  v-if="isLoggedIn">
          <div class="flex space-x-4">
            <router-link to="/" class="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
          
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <search-bar class="border border-white rounded-full px-3 py-2 w-64" />
          </div>
        </div>
        <div class="flex items-center">
          <template v-if="isLoggedIn">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="Profile picture">
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-white">{{ username }}</div>
              <div class="text-xs text-gray-300">{{ handle }}</div>
            </div>
            <button @click="logout" class="ml-4 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login" class="text-white hover:bg-blue-600 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
            <router-link to="/signup" class="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-4 ml-4 rounded-full focus:outline-none focus:shadow-outline">Signup</router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

  
  <script>
  import SearchBar from './SearchBar.vue';

 export default {
  components: {
    SearchBar,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.login.isLoggedIn && this.$store.state.login.user !== null;
  },
  userProfilePath() {
      const userId = this.$store.state.login.userId;
      return `/user/${userId}`;
    },
  },
  watch: {
    isLoggedIn() {
      this.$forceUpdate();
    }
  },
  methods: {
    logout() {
 
    this.$store.commit('SET_USER_DATA', null);
    this.$store.commit('SET_LOGIN_STATUS', false);
    this.$store.commit('SET_USER', null);
    this.$store.commit('clearUser');

    this.$router.push('/login');
  }
  }
};
</script>
  