import axios from "axios";

export default {
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    async registerUser({ commit }, { name, email, password }) {
      commit("clearError");

      try {
        const response = await axios.post("/api/register", {
          name,
          email,
          password,
        });
        const user = response.data;

        commit("setUser", user, { root: true });
        return user;
      } catch (error) {
        commit("setError", error.response.data.message);
        throw error;
      }
    },
  },
};
