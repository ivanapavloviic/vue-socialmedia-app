<template>
  <div>
    <div v-for="comment in filteredComments" :key="comment.id" class="bg-gray-100 p-4 rounded mb-2">
      <comment-item
        :comment="comment"
        :commentId="comment.id"
        :author="comment.username"
        @deleteComment="canDeleteComment(comment) && deleteComment(comment.id)" 
        @updateComment="updateComment"
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
    loggedInUser() {
      return this.$store.state.login.user;
    }
  },
  methods: {
    deleteComment(commentId) {
      this.$store.dispatch('deleteComment', commentId);
    },
    addComment(newComment) {
      this.$store.dispatch('addComment', newComment);
    },
    updateComment(updatedComment, commentId) {
    const index = this.comments.findIndex(comment => comment.id === commentId);
    if (index >= 0) {
      this.comments[index] = updatedComment;
      this.$store.dispatch('updateComment', updatedComment);
    }
  },
    canDeleteComment(comment) {
      console.log(this.loggedInUser)
      //&& comment.post.username === this.loggedInUser add for the user who is owner of the post
      return (comment.username === this.loggedInUser );
    }
  },
  created() {
    this.$store.dispatch('fetchComments');
  },
};
</script>
