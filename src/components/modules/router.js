// import Vue from "vue";
// import Router from "vue-router";
import Login from "@/components/admin/auth/Login.vue";
import Homepage from "@/components/admin/menu/Home.vue";
import Register from "@/components/admin/auth/Register.vue";
import MainScreen from "@/components/admin/menu/MainScreen.vue";
import AccountSettings from "@/components/admin/menu/AccountSettings.vue";
import TransactionHistory from "@/components/admin/menu/TransactionHistoy.vue";


export default {
    // const router = new Router({
    mode: "history",
    routes: [{
        path: "/signin",
        name: "signin",
        component: Login,
        meta: {
            tokenRequired: false
        },
    },
    {
        path: "/home",
        name:"menu",
        redirect: "home/main",
        component: Homepage,
        children: [
            {
                path: "main",
                component: MainScreen,
                meta: {
                    tokenRequired: true
                }
            },
            {
                path: "settings",
                component: AccountSettings,
                meta: {
                    tokenRequired: true
                }
            },
            {
                path: "history",
                component: TransactionHistory,
                meta: {
                    tokenRequired: true
                }
            },
            {
                path: "register",
                component: Register,
                meta: {
                    tokenRequired: true
                }
            }
        ],
        meta: {
            tokenRequired: true
        }

    },
    {
        path: '/',
        redirect: {
            path: '/sigin'
        }
    },
    {
        path: '*',
        redirect: {
            path: 'signin'
        }
    }
    ]
}
// });
// export default router;