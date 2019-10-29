import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import About from "./views/About.vue";
import Register from "./views/Register.vue";
import TransactionHistory from "./views/History.vue";
import AccountManagement from "./views/AccountManagement.vue";
import jwt_decode from "jwt-decode";
import { isNullOrUndefined } from 'util';


Vue.use(Router);

var myProps = {
    credentials: localStorage.getItem("token") ? jwt_decode(localStorage.getItem("token")).id : null
}
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
        },
        {
            path: "/admin/settings",
            component: About,
            props: myProps,
            meta: {
                tokenRequired: true
            },
        },
        {
            path: "/admin/history",
            component: TransactionHistory,
            meta: {
                tokenRequired: true
            },
        },
        {
            path: "/admin/register",
            component: Register,
            meta: {
                tokenRequired: true
            },
        },
        {
            path: "/admin/AccountManagement",
            component: AccountManagement,
            meta: {
                tokenRequired: true
            },
        },

        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                tokenRequired: false
            },
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
        if (!isNullOrUndefined(localStorage.getItem("token"))) {
            next("/home");
        } else {
            next();
        }
    } else {
        if (isNullOrUndefined(localStorage.getItem("token"))) {
            next("/login");
        } else {
            next();
        }
    }
})
export default router;
