<template>
  <nav class="bg-blue-600 fixed w-full z-10 top-0">
    <div class="container mx-auto flex justify-between items-center py-4">
      <div class="flex items-center">
        <router-link to="/" class="font-bold text-xl text-white">Home</router-link>
      </div>
      <div v-if="isLoggedIn" class="flex items-center">
        <router-link :to="userProfilePath" class="font-bold text-xl text-white">My profile</router-link>
      </div>
     
      <div v-if="isLoggedIn"  class="flex items-center" >
        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
            <search-bar class="border border-white rounded-full px-3 py-2 w-64" />
          </div>
        </div>
      </div>
      <div class="flex items-center">
        <template v-if="isLoggedIn">
          <button @click="logout" class="bg-white hover:bg-gray-200 text-blue-600 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="text-white font-bold py-2 px-4 hover:text-blue-300">Login</router-link>
          <router-link to="/signup" class="bg-white hover:bg-gray-200 text-blue-600 font-bold py-2 px-4 ml-4 rounded-full focus:outline-none focus:shadow-outline">Signup</router-link>
        </template>
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
  