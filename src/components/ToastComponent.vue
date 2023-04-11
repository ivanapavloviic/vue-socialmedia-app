<!-- Toast.vue -->
<template>
    <div v-show="visible" :class="`toast toast-${type}`">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
      type: {
        type: String,
        default: 'info',
      },
      duration: {
        type: Number,
        default: 3000,
      },
    },
    data() {
      return {
        visible: false,
      };
    },
    mounted() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, this.duration);
    },
  };
  </script>
  
  <style scoped>
  .toast {
    position: fixed;
    bottom: 16px;
    left: 16px;
    padding: 8px;
    background-color: #333;
    color: white;
    border-radius: 4px;
    opacity: 0;
    transition: opacity 0.3s;
  }
  .toast-show {
    opacity: 1;
  }
  .toast-info {
    background-color: #2196f3;
  }
  .toast-error {
    background-color: #f44336;
  }
  .toast-success {
    background-color: #4caf50;
  }
  </style>
  