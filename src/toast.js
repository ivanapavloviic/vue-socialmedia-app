// toast.js
import { createApp } from 'vue';
import ToastComponent from './components/ToastComponent.vue';

const app = createApp(ToastComponent);
const vm = app.mount(document.createElement('div'));

function showToast(message, type = 'info', duration = 3000) {
  vm.message = message;
  vm.type = type;
  vm.duration = duration;
  vm.visible = true;

  setTimeout(() => {
    vm.visible = false;
  }, duration);
}

export default showToast;
