import { createRouter, createWebHistory } from "vue-router";



import LoginPage from "./components/LoginPage.vue";
import RegisterPage from './components/RegisterPage.vue';
import HomePage from './components/HomePage.vue'
import UserProfile from './components/UserProfile.vue';

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
    meta:{requiresGuest:true}
    },
    {
      path: '/user/:userId',
      name: 'user-profile',
      component: UserProfile,
      props: route => ({ userId: Number(route.params.userId) }),
      meta:{requiresAuth:true}
    },
    {
    path: "/signup",
    component: RegisterPage,
    name: "RegisterPage",
      meta:{requiresGuest:true}
    },
      
      {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        meta:{requiresAuth:true}
      },
    
  // { path: "/test", name:'testcomponent', component: TestComponent, meta: { requiredAuth: true,  isUserAdmin:true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  if (requiresAuth && !store.state.login.isLoggedIn) {
    next('/login');
  } else if(requiresGuest && store.state.login.isLoggedIn ){
    next('/');
  }else {
    next();
  }
});

export default router