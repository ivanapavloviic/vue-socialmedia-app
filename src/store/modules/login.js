import axios from 'axios'
const state = {
       user: null
  };
  const getters = {
    isLoggedIn: state => state.user !== null
  }
  const mutations = {
    SET_LOGIN_STATUS(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_USER(state, user) {
      state.user = user;
    },

        SET_USER_DATA(state, userData) {
          state.user = userData
        }
  
  };
  
  const actions = {
    async login({ commit }, { username, password }) {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          params: {
            username,
            password
          }
        });
       

        if (response.data.length > 0) {
          const user = response.data[0];
          const userData = { username: username }
          commit('SET_LOGIN_STATUS', true);
          commit('SET_USER', user);
          commit('SET_USER_DATA', userData);
          return user;
        } else {
          commit('SET_LOGIN_STATUS', false);
          return null;
        }
      } catch (error) {
        console.error(error);
        commit('SET_LOGIN_STATUS', false);
        return null;
      }
    },
    async logout({ commit }) {
      commit('SET_LOGIN_STATUS', false);
      commit('SET_USER', null);
      commit('SET_USER_DATA', null)

    }
  };

  
  
  export default {
    state,
    getters,
    mutations,
    actions,
    
  };
  