import { createApp } from 'vue'
import App from './App.vue'


import * as appRouter from './router'
import store from './store/index'
import './index.css'

const app = createApp(App)

app.use(appRouter.routeConfig)
app.use(store)


app.mount('#app')