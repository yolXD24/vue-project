import Vue from "vue";
import Router from "vue-router";
import Login from "@/components/admin/auth/Login.vue";
import Homepage from "@/components/admin/menu/Home.vue";
import Register from "@/components/admin/auth/Register.vue";
import MainScreen from "@/components/admin/menu/MainScreen.vue";
import AccountSettings from "@/components/admin/menu/AccountSettings.vue";
import TransactionHistory from "@/components/admin/menu/TransactionHistoy.vue";

Vue.use(Router);

export default new Router({
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
            component: Login
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
            ]
        },
        {
            path: "/logout",
            name: "logout",
        }
    ]
});