import { createRouter, createWebHistory } from "vue-router";



import LoginPage from "./components/LoginPage.vue";
import RegisterPage from './components/RegisterPage.vue';
import HomePage from './components/HomePage.vue';
import { createStore } from 'vuex';
import login from './store/modules/login';

const store = createStore({
  modules: {
    login
  }
});

const routes = [

  {
    path: "/login",
    component: LoginPage,
    name: "LoginPage",
    },
    {
    path: "/signup",
    component: RegisterPage,
    name: "RegisterPage",
    },
      {
      path: "/home",
      component: HomePage,
      name: "HomePage",
      },
    
  // { path: "/test", name:'testcomponent', component: TestComponent, meta: { requiredAuth: true,  isUserAdmin:true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !store.state.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router