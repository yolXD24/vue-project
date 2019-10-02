import Vue from "vue";
import Router from "vue-router";
import Login from "./components/admin/auth/Login.vue";
import Homepage from "./components/admin/homepage/Home.vue";

Vue.use(Router);

export default new Router({
    routes: [{
            path: "/",
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }, 
        {
            path: "/home",
            name: "home",
            component: Homepage
        }
    ]
});