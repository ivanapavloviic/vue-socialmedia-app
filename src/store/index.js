
import { createStore } from "vuex";
import login from '../store/modules/login'
import register from '../store/modules/register'
import home  from "./modules/home";
const store = createStore({
    modules:{
       login:login,
       register:register,
       home:home
    }
});

export default store;