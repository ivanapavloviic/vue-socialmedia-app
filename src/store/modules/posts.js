
import axios from 'axios';

const  state= {
    users: [],
    posts: [],
    comments: [],
  };
 const mutations={
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_POSTS(state, posts) {
      state.posts = posts;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    ADD_POST(state, post) {
      state.posts.push(post);
    },
    ADD_COMMENT(state, comment) {
      state.comments.push(comment);
    },
   
    DELETE_POST(state, postId) {
      state.posts = state.posts.filter(post => post.id !== postId);
    },
    DELETE_COMMENT(state, commentId) {
      state.comments = state.comments.filter(comment => comment.id !== commentId);
    },
    UPDATE_COMMENT(state, updatedComment) {
      const index = state.comments.findIndex(comment => comment.id === updatedComment.id);
      if (index !== -1) {
        state.comments = [
          ...state.comments.slice(0, index),
          updatedComment,
          ...state.comments.slice(index + 1),
        ];
      }
    },
    UPDATE_POST(state, updatedPost) {
      const index = state.posts.findIndex(post => post.id === updatedPost.id);
      if (index !== -1) {
        state.posts = [
          ...state.posts.slice(0, index),
          updatedPost,
          ...state.posts.slice(index + 1),
        ];
      }
    },
   
  };
  const actions= {

    async fetchUsers({ commit }) {
      const response = await axios.get('http://localhost:3000/users');
      commit('SET_USERS', response.data);
    },
    async fetchPosts({ commit }) {
      const response = await axios.get('http://localhost:3000/posts');
      commit('SET_POSTS', response.data);
    },
    async fetchComments({ commit }) {
      const response = await axios.get('http://localhost:3000/comments');
      commit('SET_COMMENTS', response.data);
    },
    async createPost({ commit }, post) {
      const response = await axios.post('http://localhost:3000/posts', post);
      commit('ADD_POST', response.data);
    },
     async addComment({ commit }, newComment) {
    const response = await axios.post('http://localhost:3000/comments', newComment);
    commit('ADD_COMMENT', response.data);
  },
  async updatePost({ commit }, updatedPost) {
    const response = await axios.put(`http://localhost:3000/posts/${updatedPost.id}`, updatedPost);
    commit('UPDATE_POST', response.data);
  },
  async updateComment({ commit }, updatedComment) {
    const response = await axios.put(`http://localhost:3000/comments/${updatedComment.id}`, updatedComment);
    commit('UPDATE_COMMENT', response.data);
  },
    async deletePost({ commit }, postId) {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      commit('DELETE_POST', postId);
    },
    async deleteComment({ commit }, commentId) {
      await axios.delete(`http://localhost:3000/comments/${commentId}`);
      commit('DELETE_COMMENT', commentId);
    },
  };
  export default {
    state,
    mutations,
    actions,
    
  };
  
