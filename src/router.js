import { createRouter, createWebHistory } from "vue-router";


import LoginPage from "./components/LoginPage.vue";
import RegisterPage from './components/RegisterPage.vue'

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
  // { path: "/test", name:'testcomponent', component: TestComponent, meta: { requiredAuth: true,  isUserAdmin:true } },
];

export const routeConfig = createRouter({
  history: createWebHistory(),
  routes: routes,
  mode:'hash'
});
