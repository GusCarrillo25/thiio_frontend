import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createRouter, createWebHistory } from 'vue-router'
import RegisterUser from './components/RegisterUser.vue'
import LoginPage from './components/LoginPage.vue'
import DashboardPage from './components/DashboardPage.vue'

const routes = [
    { path: '/register', component: RegisterUser },
    { path: '/login', component: LoginPage },
    { path: '/dashboard', component: DashboardPage }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

//createApp(App).mount('#app')
