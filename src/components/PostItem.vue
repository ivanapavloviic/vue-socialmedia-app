<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div v-if="!editing">
      <h3 class="font-bold text-xl mb-2">{{ post.title }}</h3>
      <p>{{ post.content }}</p>
      <div class="flex items-center justify-end mt-4">
        <button @click="editing = true" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">Edit</button>
        <button @click="$emit('deletePost', post.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Delete</button>
      </div>
      <comment-list :postId="post.id"></comment-list>
    </div>
    <div v-else>
      <input v-model="updatedTitle" placeholder="Title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4">
      <textarea v-model="updatedContent" placeholder="Content" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"></textarea>
      <div class="flex items-center justify-end">
        <button @click="savePost" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">Save</button>
        <button @click="cancelEdit" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline">Cancel</button>
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
  methods: {
    savePost() {
      this.$emit('updatePost', {
        ...this.post,
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
