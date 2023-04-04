<template>
  <div>
    <div v-for="comment in filteredComments" :key="comment.id" class="bg-gray-100 p-4 rounded mb-2">
      <comment-item
        :comment="comment"
        @deleteComment="deleteComment" 
      ></comment-item>
    </div>
  </div>
        <add-comment :postId="postId" @addComment="addComment"></add-comment>

</template>

<script>
import CommentItem from './CommentItem.vue';
import AddComment from './AddComment.vue';

export default {
  props: {
    postId: {
      type: Number,
      required: true,
    },
  },
  components: {
    CommentItem,AddComment
  },
  computed: {
    comments() {
      return this.$store.state.posts.comments;
    },
    filteredComments() {
      if (this.comments) {
        return this.comments.filter(comment => comment.postId === this.postId);
      }
      return [];
    },
  },
  methods: {
    deleteComment(commentId) {
      this.$store.dispatch('deleteComment', commentId);
    },
    addComment(newComment) {
      this.$store.dispatch('addComment', newComment);
    },
  },
  created() {
    this.$store.dispatch('fetchComments');
  },
};
</script>
