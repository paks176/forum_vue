import Vue from 'vue';

const routes = [
    {
        path: '/',
        name: 'Все категории',
        component: () => import('../components/AllCategories.vue')
    },
    {
        path: '/category',
        name: 'SubContent',
        component: () => import('../components/SubContent.vue')
    },
];

import VueRouter from "vue-router";

const router = new VueRouter({
    routes
});

// ToDo Добавить хук beforeEach для проверики аторизации

Vue.use(VueRouter);

export default router;