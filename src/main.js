import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
/*eslint-disable */

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    props: {
        token: localStorage.getItem
    },
    render: h => h(App)
}).$mount("#app");