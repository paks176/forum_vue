import Vue from 'vue';
import Store from '@/store/index'

const routes = [
    {
        path: '/',
        redirect: {
            path: '/main',
            component: () => import('../components/AllCategories.vue'),
        }
    },
    {
        path: '/main',
        component: () => import('../components/AllCategories.vue'),
    },
    {
        path: '/subcategory_:id',
        component: () => import('../components/SubContent.vue'),
    },
    {
        path: '/clubpage_:id',
        component: () => import('../components/ClubPage.vue'),
    },
    {
        path: '/login',
        component: () => import('../components/AuthPage.vue')
    },
    {
        name: 'Payments',
        path: '/payments/',
        component: () => import('../components/PaymentsPage.vue')
    },
    {
        path: '*',
        component: () => import('../components/Page404.vue'),
    }
    
];

import VueRouter from "vue-router";

const router = new VueRouter({
    mode: 'history',
    routes
});

// ToDo Добавить хук beforeEach для проверики аторизации
router.beforeEach((to, from, next) => {
    Store.dispatch('getInfoAboutMe')
        .then(() => {next()})
    })

Vue.use(VueRouter);

export default router;