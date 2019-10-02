import Vue from "vue";
import Router from "vue-router";
import Login from "./components/admin/auth/Login.vue";
import Homepage from "./components/admin/menu/Home.vue";
import Register from "./components/admin/auth/Register.vue";


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
<<<<<<< HEAD
            component: Login,
            meta: { hideNavigation: true }
        },
        {
            path: "/register",
            name: "register",
            component: Register,
            meta: { hideNavigation: false }

        },
=======
            component: Login
        }, 
>>>>>>> origin/chervin-master
        {
            path: "/home",
            name: "home",
            component: Homepage,
            meta: { hideNavigation: false }
        }

    ]
});