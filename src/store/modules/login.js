import axios from 'axios'
const state = {
       user: null,
       userId:null
  };
  const getters = {
    isLoggedIn: state => state.user !== null,
  }
  const mutations = {
    SET_LOGIN_STATUS(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USER_ID(state, userId){
      state.userId=userId
    },

        SET_USER_DATA(state, userData) {
          state.user = userData
        },
        clearUser(state) {
          state.user = null;
        },
  
  };
  
  const actions = {
    async login({ commit }, { username, password, userId }) {
      try {
        const response = await axios.get('http://localhost:3000/users', {
          params: {
            username,
            password,
            userId
          }
        });
       

        if (response.data.length > 0) {
          const user = response.data[0];
          const userData = { username: username }
          const userId={userId:userId}
          commit('SET_LOGIN_STATUS', true);
          commit('SET_USER', user);
          commit('SET_USER_ID',userId)
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
      commit('SET_USER_ID',null);
      commit('SET_USER_DATA', null)

    }
  };

  
  
  export default {
    state,
    getters,
    mutations,
    actions,
    
  };
  