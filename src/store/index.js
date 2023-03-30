
import { createStore } from "vuex";
import login from '../store/modules/login'
import register from '../store/modules/register'
const store = createStore({
    modules:{
       login:login,
       register:register
    }
});

export default store;