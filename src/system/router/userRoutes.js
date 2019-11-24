var routes = [{
        path: "/",
        redirect: {
            name: "Home",
        },
        meta: {
            user: true
        }
    },
    {
        path: "/user/home",
        name: "Home",
        component: () =>
            import ("@/pages/user/views/Home.vue"),
        meta: {
            user: true
        }
    },
    {
        path: "/user/get/request-form/:type",
        name: "barangay-clearance",
        props: { editMode: false },
        component: () =>
            import ("@/pages/user/views/RequestForm.vue"),
        meta: {
            user: true
        }
    }
]
let userRoutes = () => {
    return routes
}


export { userRoutes };