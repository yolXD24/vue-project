import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import Register from "./views/Register.vue";
import TransactionHistory from "./views/History.vue";
import AccountManagement from "./views/AccountManagement.vue";
import NotFound from "./views/404.vue";

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
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') === null) {
                    next('/login')
                } else {
                    next()
                }
            }
        },
        {
            path: "/admin/settings",
            component: About,
            meta: {
                tokenRequired: true
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') === null) {
                    next('/login')
                } else {
                    next()
                }
            }
        },
        {
            path: "/admin/history",
            component: TransactionHistory,
            meta: {
                tokenRequired: true
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') === null) {
                    next('/login')
                } else {
                    next()
                }
            }
        },
        {
            path: "/admin/register",
            component: Register,
            meta: {
                tokenRequired: true
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') === null) {
                    next('/login')
                } else {
                    next()
                }
            }
        },
        {
            path: "/admin/AccountManagement",
            component: AccountManagement,
            meta: {
                tokenRequired: true
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') === null) {
                    next('/login')
                } else {
                    next()
                }
            }
        },

        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                tokenRequired: false
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') !== null) {
                    next('/home')

                } else {
                    next()
                }
            }
        },
        {
            path: "/about",
            name: "about",
            component: About,
            meta: {
                tokenRequired: true
            },
            beforeEnter: (to, from, next) => {
                if (localStorage.getItem('token') !== null) {
                    next()
                } else {
                    next('/login')
                }
            }
        },
        {
            path: "*",
            name: "NotFound",
            component: NotFound,
            redirect: {
                path: "/"
            }

        },
    ]
});


export default router;