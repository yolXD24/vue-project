import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import About from "@/views/About.vue";
import Register from "@/views/Register.vue";
import TransactionHistory from "@/views/History.vue";
import AccountManagement from "@/views/AccountManagement.vue";
import store from '@/helpers/vuex/store.js'

Vue.use(Router);

var router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            redirect: {
                path: "/home"
            }
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/settings",
            component: About,
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/history",
            component: TransactionHistory,
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/register",
            component: Register,
            meta: {
                tokenRequired: true
            }
        },
        {
            path: "/admin/AccountManagement",
            component: AccountManagement,
            meta: {
                tokenRequired: true
            }
        },

        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                tokenRequired: false
            }
        },
        {
            path: "*",
            name: "NotFound",
            redirect: {
                path: "/"
            }
        }
    ]
});


router.beforeEach((to, from, next) => {
    if (!to.meta.tokenRequired) {
        if (store.getters.status) {
            next("/home");
        } else {
            next();
        }
    } else {
        if (!store.getters.status) {
            next("/login");
        } else {
            next();
        }
    }
});
export default router;