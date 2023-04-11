<template>
  <div class="bg-white rounded-lg border border-gray-300 shadow-md p-4 mb-4">
    <div class="flex items-center mb-2">
      <img class="w-12 h-12 rounded-full mr-4" src="../../src/assets/user.jpg" alt="User avatar">
      <div>
        <span class="text-gray-600 text-sm">{{ post.username }}</span>
      </div>
    </div>
    <div v-if="!editing">     
      <p class="text-base">{{ post.content }}</p>
      <div class="flex items-center justify-end mt-4">
        <button v-if="canEditOrDelete" @click="editing = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 focus:outline-none focus:shadow-outline">
          <i class="fas fa-edit"></i>
        </button>
        <button v-if="canEditOrDelete" @click="$emit('deletePost', post.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>

      <comment-list :postId="post.id"></comment-list>
    </div>
    <div v-else>
      <textarea v-model="updatedContent" placeholder="Content" class="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4" rows="6"></textarea>
      <div class="flex items-center justify-end">
        <button @click="savePost" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2 focus:outline-none focus:shadow-outline hover:shadow-md">Save</button>
        <button @click="cancelEdit" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full mr-2 focus:outline-none focus:shadow-outline hover:shadow-md">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from './CommentList.vue';

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    CommentList,
  },
  data() {
    return {
      editing: false,
      updatedTitle: this.post.title,
      updatedContent: this.post.content,
    };
  },
  computed:{
    getUserId(){
      return this.$store.state.login.userId;

    },
    canEditOrDelete() {
      return this.post.userId === this.getUserId;
    },
  },
  methods: {
    savePost() {
    this.$emit('updatePost', {
      ...this.post,
      postId: this.post.id, // Add postId
      title: this.updatedTitle,
      content: this.updatedContent,
    });
    this.editing = false;
  },

    cancelEdit() {
      this.editing = false;
      this.updatedTitle = this.post.title;
      this.updatedContent = this.post.content;
    },
  },
};
</script>
