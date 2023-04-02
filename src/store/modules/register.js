import axios from 'axios';

const state = {
  signupSuccess: false
};

const mutations = {
  SET_SIGNUP_STATUS(state, signupSuccess) {
    state.signupSuccess = signupSuccess;
  }
};

const actions = {
  async signup({ commit }, { username, password }) {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        username,
        password
      });
      console.log(response)
      commit('SET_SIGNUP_STATUS', true);
      return true;
    } catch (error) {
      console.error(error);
      commit('SET_SIGNUP_STATUS', false);
      return false;
    }
  }
};

export default {
  state,
  mutations,
  actions
};
