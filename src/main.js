import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import router from "./router";
import VueAxios from "@/plugins/axios";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    Router,
    render: h => h(App)
}).$mount("#app");

Vue.use(VueAxios);