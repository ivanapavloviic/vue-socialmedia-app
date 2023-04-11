<template>
  <div class="p-4">
    <div class="flex justify-between mb-4">
      <button
        class="bg-white text-blue-400 hover:text-blue-500 border border-blue-400 rounded-full font-bold text-sm py-2 px-4 focus:outline-none focus:shadow-outline"
        @click="showComments = !showComments"
      >
        {{ showComments ? 'Hide comments' : 'Show comments' }}
      </button>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
        @click="showAddComment = !showAddComment"
      >
        Add comment
      </button>
    </div>
    <div v-show="showAddComment">
      <add-comment :postId="postId" @addComment="addComment" />
    </div>
    <div v-show="showComments">
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
  </div>
</template>




<script>
import CommentItem from './CommentItem.vue';
import AddComment from './AddComment.vue';

export default {
  data() {
  return {
    showAddComment: false,
    showComments: false,
  }
},
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
