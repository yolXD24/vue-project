import Vue from "vue";
import Router from "vue-router";
import store from '../functions/vuex/store.js'
import { userRoutes } from "./userRoutes";



Vue.use(Router);

var router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: { path: "/user" }
        },
        {
            path: "/admin/",
            redirect: {
                name: "home"
            }
        },
        {
            path: "/admin/home",
            name: "home",
            component: () => import('@/views/Home.vue'),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/settings",
            name: 'settings',
            component: () => import("@/views/About.vue"),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/history",
            component: () => import("@/views/History.vue"),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/register",
            component: () => import("@/views/Register.vue"),
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/AccountManagement",
            component: () => import("@/views/AccountManagement.vue"),
            meta: {
                tokenRequired: true
            }
        },

        {
            path: "/admin/login",
            name: "login",
            component: () => import("@/views/Login.vue"),
            meta: {
                tokenRequired: false
            }
        },
        {
            path: "*",
            name: 'notFound',
            component: () => import("@/views/404.vue")
        },
        {
            path: "/user",
            // name: "user",
            component: () => import("@/user/UserView.vue"),
            children: userRoutes()
        }
    ]
});

// console.log(router);

router.beforeEach((to, from, next) => {
    if (!to.meta.tokenRequired) {
        if (store.getters.status && to.name !== 'notFound' && !to.meta.user) {
            next("/home");
        } else {
            next();
        }
    } else {
        if (!store.getters.status && to.name !== 'notFound') {
            next("/admin/login");
        } else {
            next();
        }
    }
});
export default router;