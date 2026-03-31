import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

import Home from './views/Home.vue'
import Messages from './views/Messages.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/messages', component: Messages }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')