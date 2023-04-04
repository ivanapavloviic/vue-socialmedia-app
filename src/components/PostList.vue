<template>
  <div>
    <new-post @createPost="createPost"></new-post>
    <post-item
      v-for="post in posts"
      :key="post.id"
      :post="post"
      @deletePost="deletePost"
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
  },
  methods: {
    createPost(post) {
      this.$store.dispatch('createPost', post);
    },
    deletePost(postId) {
      this.$store.dispatch('deletePost', postId);
    },
  },
  created() {
    this.$store.dispatch('fetchPosts');
  },
};
</script>
