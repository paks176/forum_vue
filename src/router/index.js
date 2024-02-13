import Vue from 'vue';

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
        path: '*',
        component: () => import('../components/Page404.vue'),
    }
    
];

import VueRouter from "vue-router";

const router = new VueRouter({
    routes
});

// ToDo Добавить хук beforeEach для проверики аторизации

Vue.use(VueRouter);

export default router;