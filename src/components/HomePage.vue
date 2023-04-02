<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-bold my-4">Posts</h1>
    <div v-if="!isLoggedIn" class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
      <p class="font-bold">You are not logged in!</p>
      <p>Please log in to create, edit, or delete posts and comments.</p>
    </div>
    <div class="mb-8" v-for="post in posts" :key="post.id">
      <div class="border-b border-gray-300 mb-4 pb-4">
        <h2 class="text-xl font-bold">{{ post.title }}</h2>
        <p class="text-gray-500">{{ post.body }}</p>
        <div class="flex items-center mt-4">
          <span class="text-gray-500 mr-4">{{ formatDate(post.createdAt) }}</span>
          <button class="text-gray-500 hover:text-blue-500" @click="editPost(post)">Edit</button>
          <button class="text-red-500 hover:text-red-700 ml-4" @click="deletePost(post)">Delete</button>
        </div>
      </div>
      <div v-for="comment in post.comments" :key="comment.id" class="border-b border-gray-300 mb-4 pb-4">
        <p class="text-gray-500">{{ comment.body }}</p>
        <div class="flex items-center mt-4">
          <span class="text-gray-500 mr-4">{{ formatDate(comment.createdAt) }}</span>
          <button class="text-gray-500 hover:text-blue-500" @click="editComment(post, comment)">Edit</button>
          <button class="text-red-500 hover:text-red-700 ml-4" @click="deleteComment(post, comment)">Delete</button>
        </div>
      </div>
      <form class="mt-4" @submit.prevent="addComment(post)">
        <h3 class="text-lg font-bold mb-2">Add Comment</h3>
        <textarea class="w-full border border-gray-300 p-2" v-model="commentBody"></textarea>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      posts: [],
      commentBody: ''
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn && this.$store.state.user !== null;
    }
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts?_expand=user&_embed=comments');
        this.posts = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async addComment(post) {
      if (!this.isLoggedIn) {
        alert('You must be logged in to add comments.');
        return;
      }
      if (this.commentBody.trim() === '') {
        alert('Comment body cannot be empty.');
        return;
      }
      const comment = {
        body: this
        .commentBody,
    createdAt: new Date()
  };
  try {
    const response = await axios.post('http://localhost:3000/comments', comment);
    post.comments.push(response.data);
    this.commentBody = '';
  } catch (error) {
    console.error(error);
  }
},
async editPost(post) {
  if (!this.isLoggedIn || post.userId !== this.$store.state.user.id) {
    alert('You do not have permission to edit this post.');
    return;
  }
  const title = prompt('Enter a new title:', post.title);
  const body = prompt('Enter a new body:', post.body);
  if (title !== null && body !== null && (title.trim() !== '' || body.trim() !== '')) {
    try {
      await axios.patch(`http://localhost:3000/posts/${post.id}`, {
        title: title.trim() !== '' ? title : post.title,
        body: body.trim() !== '' ? body : post.body
      });
      post.title = title.trim() !== '' ? title : post.title;
      post.body = body.trim() !== '' ? body : post.body;
    } catch (error) {
      console.error(error);
    }
  }
},
async deletePost(post) {
  if (!this.isLoggedIn || post.userId !== this.$store.state.user.id) {
    alert('You do not have permission to delete this post.');
    return;
  }
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await axios.delete(`http://localhost:3000/posts/${post.id}`);
      const index = this.posts.findIndex(p => p.id === post.id);
      if (index !== -1) {
        this.posts.splice(index, 1);
      }
    } catch (error) {
      console.error(error);
    }
  }
},
async editComment(post, comment) {
  if (!this.isLoggedIn || comment.userId !== this.$store.state.user.id) {
    alert('You do not have permission to edit this comment.');
    return;
  }
  const body = prompt('Enter a new body:', comment.body);
  if (body !== null && body.trim() !== '') {
    try {
      await axios.patch(`http://localhost:3000/comments/${comment.id}`, {
        body: body
      });
      comment.body = body;
    } catch (error) {
      console.error(error);
    }
  }
},
async deleteComment(post, comment) {
  if (!this.isLoggedIn || comment.userId !== this.$store.state.user.id) {
    alert('You do not have permission to delete this comment.');
    return;
  }
  if (confirm('Are you sure you want to delete this comment?')) {
    try {
      await axios.delete(`http://localhost:3000/comments/${comment.id}`);
      const index = post.comments.findIndex(c => c.id === comment.id);
      if (index !== -1) {
        post.comments.splice(index, 1);
      }
    } catch (error) {
      console.error(error);
    }
  }
},
formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}
}
};
</script>

<style>
  textarea {
    min-height: 100px;
  }
</style>