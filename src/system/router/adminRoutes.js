var routes = [{
        path: "/",
        redirect: {
            name: "home"
        }
    },
    {
        path: "/admin/home",
        name: "home",
        component: () =>
            import ('@/pages/admin/views/Home.vue'),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/settings",
        name: 'settings',
        component: () =>
            import ("@/pages/admin/views/About.vue"),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/history",
        component: () =>
            import ("@/pages/admin/views/History.vue"),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/register",
        component: () =>
            import ("@/pages/admin/views/Register.vue"),
        meta: {
            tokenRequired: true
        }
    },
    {
        path: "/admin/AccountManagement",
        component: () =>
            import ("@/pages/admin/views/AccountManagement.vue"),
        meta: {
            tokenRequired: true
        }
    },

    {
        path: "/admin/login",
        name: "login",
        component: () =>
            import ("@/pages/admin/views/Login.vue"),
        meta: {
            tokenRequired: false
        }
    }
]
let adminRoutes = () => {
    return routes
}

export { adminRoutes }