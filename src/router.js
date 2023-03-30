import { createRouter, createWebHistory } from "vue-router";


import LoginPage from "./components/LoginPage.vue";


const routes = [

  {
    path: "/login",
    component: LoginPage,
    name: "LoginPage",
    },
  
  // { path: "/test", name:'testcomponent', component: TestComponent, meta: { requiredAuth: true,  isUserAdmin:true } },
];

export const routeConfig = createRouter({
  history: createWebHistory(),
  routes: routes,
  mode:'hash'
});
