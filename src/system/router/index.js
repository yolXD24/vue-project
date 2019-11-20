import Vue from "vue";
import Router from "vue-router";
import store from '../functions/vuex/store.js'
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes.js";

Vue.use(Router);

var router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
            path: "/",
            redirect: {
                path: "/user"
            }
        },
        {
            path: "/admin",
            component: () =>
                import ("@/pages/admin/AdminView.vue"),
            children: adminRoutes()
        },
        {
            path: "/user",
            component: () =>
                import ("@/pages/user/UserView.vue"),
            children: userRoutes()
        },
        {
            path: "*",
            name: 'notFound',
            component: () =>
                import ("@/pages/admin/views/404.vue")
        },
    ]
});

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