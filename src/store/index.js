
import { createStore } from "vuex";
import login from '../store/modules/login'
import register from '../store/modules/register'
import home  from "./modules/home";
import posts from './modules/posts'
const store = createStore({
    modules:{
       login:login,
       register:register,
       home:home,
       posts:posts
    }
});

export default store;