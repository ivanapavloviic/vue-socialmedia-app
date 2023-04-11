<template>
  <div>
    <div v-if="!editing" class="flex justify-between">
      <div>
        <p class="text-gray-700">{{ comment.content }}</p>
        <p class="text-gray-400 text-sm mt-2">By {{ author }}</p>
      </div>
      <div class="flex space-x-2">
        <button v-if="canEditOrDelete" @click="editing = true" class="text-blue-500 hover:text-blue-700 font-bold focus:outline-none">
          <i class="fas fa-edit"></i>
        </button>
        <button v-if="canEditOrDelete" @click="$emit('deleteComment', comment.id)" class="text-red-500 hover:text-red-700 font-bold focus:outline-none">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
    <div v-else>
      <textarea v-model="updatedContent" class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4" rows="3"></textarea>
      <div class="flex justify-end space-x-2">
        <button @click="saveComment" class="text-blue-500 hover:text-blue-700 font-bold focus:outline-none">
          <i class="fas fa-save"></i>
        </button>
        <button @click="cancelEdit" class="text-gray-500 hover:text-gray-700 font-bold focus:outline-none">
          <i class="fas fa-times"></i>
        </button>
      </div>
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
