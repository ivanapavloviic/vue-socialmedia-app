// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import showToast from './toast';

const app = createApp(App);
app.config.globalProperties.$showToast = showToast;

app.use(router);
app.use(store);

// Check if the user is already logged in
store.dispatch('checkUser').then(() => {
  app.mount('#app');
});
