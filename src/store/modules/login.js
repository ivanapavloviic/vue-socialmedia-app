import axios from 'axios'


export const state = {
    user: null,
    error: null,
  };
  
  export const mutations = {
    setUser(state, user) {
      state.user = user;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  };
  
  export const actions = {
    async loginUser({ commit }, { email, password }) {
      commit("clearError");
  
      try {
        const response = await axios.post("http://localhost:3000/profile", {
          email,
          password,
        });
        const user = response.data;
  
        commit("setUser", user);
        return user;
      } catch (error) {
        commit("setError", error.response.data.message);
        throw error;
      }
    },
    logoutUser({ commit }) {
      this.$axios.post("/api/logout").then(() => {
        commit("setUser", null);
      });
    },
  };
  
  export default {
    namespaced: true,
    state,
    actions,
    mutations,
  };
  