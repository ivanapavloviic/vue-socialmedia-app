
import { createStore } from "vuex";
import login from '../store/modules/login'

const store = createStore({
    modules:{
       login:login
    }
});

export default store;