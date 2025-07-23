import {createRouter, createWebHistory} from 'vue-router'
import LoginView from '../components/auth/LoginView.vue'
import SignupView from '../components/auth/SignupView.vue'
import NoAuthHomeView from '../components/home/NoAuthHomeView.vue'
import ProfileView from '../components/profile/ProfileView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: NoAuthHomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignupView
    },
    {
        path: '/profile/:username?',
        name: 'Profile',
        component: ProfileView
    },
]

const router = createRouter({
    history: createWebHistory(), routes,
})

export default router