import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Find_Tutorial from '../views/Find_Tutorial';
import Create_Tutorial from '../components/tutorial/Create-Tutorial.vue';
import Edit_Tutorial from '../components/tutorial/Edit-Tutorial.vue';
import Edit_Profile from '../components/profile/Edit-Profile.vue';
import User_Profile from '../views/User_Profile.vue';
import Forgot from '../views/Forgot.vue';
import Reset from '../views/Reset.vue';
import TutorialPage from '../views/Tutorial_Page.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        //alias: ['/home'],
        name: 'Home',
        component: Home,
        meta: {
            auth: true,
            title: 'NKA: Home Page'
        }
    },
    {
        path: '/profile/:id',
        name: 'Profile',
        component: User_Profile,
        meta: {
            auth: true,
            title: 'NKA: Profile Information'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            auth: true,
            title: 'NKA: Login'
        }
    },
    {
        path: '/register',
        name: 'Registeration',
        component: Register,
        meta: {
            auth: true,
            title: 'NKA: Registeration'
        }
    },
    {
        path: '/create-tutorial',
        name: 'Create new tutorial',
        component: Create_Tutorial,
        meta: {
            auth: true,
            title: 'NKA: Create Tutorial'
        }
    },
    {
        path: '/edit-tutorial',
        name: 'Edit tutorial',
        component: Edit_Tutorial,
        meta: {
            auth: true,
            title: 'NKA: Edit Tutorial'
        }
    },
    {
        path: '/edit-profile',
        name: 'Edit profile',
        component: Edit_Profile,
        meta: {
            auth: true,
            title: 'NKA: Edit Tutorial'
        }
    },
    {
        path: '/tutorials',
        name: 'Find a Tutorial',
        component: Find_Tutorial,
        meta: {
            auth: true,
            title: 'NKA: Find Tutorial'
        }
    },
    {
        path: '/tutorial/:id',
        name: 'Tutorial page',
        component: TutorialPage,
        meta: {
            auth: true,
            title: 'NKA: Turoial Info Page'
        }
    },
    {
        path: '/forgot',
        name: 'Forgot Your Password',
        component: Forgot,
        meta: {
            auth: true,
            title: 'NKA: Forgot your password'
        }
    },
    {
        path: '/reset/:token',
        name: 'Reset Your Password',
        component: Reset,
        meta: {
            auth: true,
            title: 'NKA: Reset Your Password'
        }
    }
];

const router = new VueRouter({
    routes
});

export default router;
