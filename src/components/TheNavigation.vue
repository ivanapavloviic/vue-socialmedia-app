<template>
    <nav class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <a href="#">
                <svg
                  class="h-8 w-8 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </a>
            </div>
            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
              <a
                href="#"
                class="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >Home</a
              >
            </div>
          </div>
          <div class="hidden sm:flex sm:items-center sm:ml-6">
            <button
              v-if="!user"
              class="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="$router.push('/login')"
            >
              Log in
            </button>
            <button
              v-if="!user"
              class="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="$router.push('/signup')"
            >
              Sign up
          </button>
            <button
              v-if="user"
              class="ml-8 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              @click="logoutUser"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  
  <script>
  export default {
    computed: {
        user() {
      return this.$store.state.user;
    },
  },
  methods: {
    logoutUser() {
      // Call logout API using Axios
      this.$axios.post("/api/logout");

      // Clear user state using Vuex
      this.$store.commit("setUser", null);

      // Navigate to login page
      this.$router.push("/login");
    },
  },
};
</script>
  