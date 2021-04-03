import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from "./store/store"




createApp(App).use(router, store).use(VueAxios, axios).mount('#app')

