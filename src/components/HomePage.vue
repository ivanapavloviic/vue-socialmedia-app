<template>
  <div>
    <new-post @createPost="createPost"></new-post>
    <post-item
      v-for="post in sortedPosts"
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
    posts() {
      return this.$store.state.posts.posts;
    },
    sortedPosts() {
      return this.posts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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
