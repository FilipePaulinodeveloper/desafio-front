import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import './plugins/axios';

import './css/app.css';

const routes = [
    { 
        path: '/', 
        name: 'home', 
        component: () => import('./components/pages/HomeApp.vue'),
    },
    { 
        path: '/users', 
        name: 'users', 
        component: () => import('./components/pages/user/UsersApp.vue') 
    },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes, 
    linkActiveClass: 'link-active',
})

const app = createApp(App)

app.config.globalProperties.urlBackend = 'https://desafio.test'

app.use(router)
app.mount('#app')


