import Vue from "vue";
import App from "./App.vue";
import router from "./system/router/index";
import vuetify from "./plugins/vuetify";
import store from "./system/functions/vuex/store";
/*eslint-disable */

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount("#app");