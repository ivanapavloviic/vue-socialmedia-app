<template>
  <div>
    <new-post @createPost="createPost"></new-post>
    <post-item
      v-for="post in filteredPosts"
      :key="post.id"    
      :post="post"
      @deletePost="deletePost"
      @updatePost="updatePost"
    ></post-item>
  </div>
</template>

<script>
import NewPost from './NewPost.vue';
import PostItem from './PostItem.vue';

export default {
  components: {
    NewPost,
    PostItem,
  },
  computed: {
    //TODO: fix sort posts
    posts() {
    return this.$store.state.posts.posts
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  },
  filteredPosts() {
    const userId = this.$store.state.login.userId;
    return this.posts.filter(post => post.userId === userId);
  },




  },
  methods: {
    createPost(post) {
      this.$store.dispatch('createPost', post);
    },
    deletePost(postId) {
      this.$store.dispatch('deletePost', postId);
    },
  
    updatePost(post) {
    this.$store.dispatch('updatePost', post);
  },

  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
};
</script>
