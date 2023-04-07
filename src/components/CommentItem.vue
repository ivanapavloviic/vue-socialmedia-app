<template>
  <div>
    <div v-if="!editing">
      <p class="text-gray-700">{{ comment.content }}</p>
      <p class="text-gray-400 text-sm">By {{ author }}</p>
      <button v-if="canEditOrDelete" @click="editing = true" class="text-blue-500 hover:text-blue-700 font-bold focus:outline-none">Edit</button>
      <button v-if="canEditOrDelete" @click="$emit('deleteComment', comment.id)" class="text-red-500 hover:text-red-700 font-bold focus:outline-none">Delete</button>
    </div>
    <div v-else>
      <textarea v-model="updatedContent" class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4" rows="3"></textarea>
      <button @click="saveComment" class="text-blue-500 hover:text-blue-700 font-bold focus:outline-none">Save</button>
      <button @click="cancelEdit" class="text-gray-500 hover:text-gray-700 font-bold focus:outline-none">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  commentId: {
    type: Number,
    required: true,
  },
  author: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
      updatedContent: this.comment.content,
    };
  },
  computed:{
    
    loggedInUser() {
      return this.$store.state.login.user;
    },
    canEditOrDelete() {
      return this.comment.username === this.loggedInUser;
    },
  },
  
  methods: {
    saveComment() {
      this.$emit('updateComment', {
        ...this.comment,
        content: this.updatedContent,
}, this.commentId);
      this.editing = false;
    },
    cancelEdit() {
      this.editing = false;
      this.updatedContent = this.comment.content;
    },
  },
};
</script>
