var routes = [
    {
        path: "/admin/",
        redirect: {
            path: "/home"
        }
    },
    {
        path: "/admin/home",
        name: "home",
        component: ()=>import('@/views/Home.vue'),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/settings",
        name: 'settings',
        component: ()=>import("@/views/About.vue"),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/history",
        component: ()=>import("@/views/History.vue"),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/register",
        component: ()=>import("@/views/Register.vue"),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/AccountManagement",
        component: ()=>import("@/views/AccountManagement.vue"),
        meta: {
            tokenRequired: true
        }
    },

    {
        path: "/admin/login",
        name: "login",
        component: ()=>import("@/views/Login.vue"),
        meta: {
            tokenRequired: false
        }
    },
    {
        path: "*",
        name: 'notFound',
        component: ()=>import("@/views/404.vue")
    }
]

let adminRoutes = ()=>{
    return routes
}

export { adminRoutes }