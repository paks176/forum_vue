import Vue from 'vue';

const routes = [
    {
        path: '/',
        name: 'AllCategories',
        component: () => import('../components/AllCategories.vue')
    },
    // {
    //     path: '/subcontent/',
    //     name: 'SubContent',
    //     component: () => import('../components/SubContent.vue')
    // },
];

import VueRouter from "vue-router";

const router = new VueRouter({
    routes
});

Vue.use(VueRouter);

export default router;