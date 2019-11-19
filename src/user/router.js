import Vue from "vue";
import Router from "vue-router";
import Home from "./components/user/auth/Home.vue";
import BusinessClearance from "./components/user/homepage/BusinessClearance.vue";
import BarangayClearance from "./components/user/homepage/BarangayClearance.vue";
import BarangayIndigency from "./components/user/homepage/BarangayIndigency.vue";
import BarangayID from "./components/user/homepage/BarangayID.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            redirect: {
                name: "Home",
                component: Home
            }
        },
        {
            path: "/home",
            name: "Home",
            component: Home
        },
        {
            path: "/business-clearance",
            name: "business-clearance",
            component: BusinessClearance
        },
        {
            path: "/barangay-id",
            name: "barangay-id",
            component: BarangayID
        },
        {
            path: "/barangay-clearance",
            name: "barangay-clearance",
            component: BarangayClearance
        },
        {
            path: "/barangay-indigency",
            name: "barangay-indigency",
            component: BarangayIndigency
        }
    ]
});