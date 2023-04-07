<template>
  <div class="relative">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search for users..."
      @click="toggleDropdown"
      class="block w-full rounded-md border-gray-300 shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />

    <div
      v-if="filteredUsers.length  && isDropdownVisible"
      class="fixed z-10 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto"
    >
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="py-1 px-3 hover:bg-indigo-500 hover:text-white"
      >
        <router-link :to="'/user/' + user.id"  @click="toggleDropdown">{{ user.username }}</router-link>
      </div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
      searchTerm: "",
      isDropdownVisible:false
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        return user.username
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    },
  },
  methods:{
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
  },
  created() {
    // fetch all users from the API
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
  
  <style scoped>
input:focus + .absolute {
  display: block;
}
.absolute {
  display: none;
}
</style>
  