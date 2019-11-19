import Vue from "vue";
import Router from "vue-router";
import store from '../functions/vuex/store.js'
import { userRoutes } from "./userRoutes";
import { adminRoutes } from "./adminRoutes";



var allRoutes = adminRoutes().concat(userRoutes())
Vue.use(Router);

var router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: allRoutes
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
        if (!store.getters.status) {
            next("/login");
        } else {
            next();
        }
    }
});
export default router;