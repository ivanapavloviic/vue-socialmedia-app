
import axios from 'axios';
import { API_URL } from "../../../src/.env.js";

const state = {
  isLoggedIn: false,
  user: null,
  posts: [],
  comments: []
};

const mutations = {
  SET_LOGIN_STATUS(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_POSTS(state, posts) {
    state.posts = posts;
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  }
};

const actions = {
  async login({ commit }, { username, password }) {
    try {
      const response = await axios.get(
        `${API_URL}/users`, {
        params: {
          username,
          password
        }
      });
      if (response.data.length > 0) {
        const user = response.data[0];
        commit('SET_LOGIN_STATUS', true);
        commit('SET_USER', user);
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
  },
  async fetchPosts({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/posts?_expand=user&_embed=comments`);
      commit('SET_POSTS', response.data);
    } catch (error) {
      console.error(error);
    }
  },
  async fetchComments({ commit }) {
    try {
      const response = await axios.get(`${API_URL}/comments`);
      commit('SET_COMMENTS', response.data);
    } catch (error) {
      console.error(error);
    }
  }
};

export default {
  state,
  mutations,
  actions
};
