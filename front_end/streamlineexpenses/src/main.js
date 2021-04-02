import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import Vuex from 'vuex'

createApp(App).use(router, Vuex).use(VueAxios, axios).mount('#app')

