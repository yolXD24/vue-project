import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/admin/auth/Login.vue";
import Homepage from "@/components/admin/menu/Home.vue";
import Register from "@/components/admin/auth/Register.vue";
import MainScreen from "@/components/admin/menu/MainScreen.vue";
import AccountSettings from "@/components/admin/menu/AccountSettings.vue";
import TransactionHistory from "@/components/admin/menu/TransactionHistoy.vue";

Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [{
            path: "/",
            redirect: {
                name: "signin"
            }
        },
        {
            path: "/signin",
            name: "signin",
            component: Login,
            meta: {
                guest: true
            }
        },
        {
            path: "/home/",
            name: "home",
            redirect: "home/main",
            component: Homepage,
            children: [
                { path: "main", component: MainScreen },
                { path: "settings", component: AccountSettings },
                { path: "history", component: TransactionHistory },
                { path: "register", component: Register }
            ],
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/logout",
            name: "logout",
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(page => page.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/signin',
                params: { nextUrl: to.fullPath }
            })
        } else {
            // let user = JSON.parse(localStorage.getItem('user'))
            next({ name: 'home' })
        }
    } else if (to.matched.some(page => page.meta.guest)) {
        if (localStorage.getItem('jwt') == null) {
            next()
        } else {
            next({ name: 'home' })
        }
    } else {
        next()
    }
})

export default router;