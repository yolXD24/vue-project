import Vue from "vue";
import App from "./App.vue";
import router from "./system/router/index";
import vuetify from "./plugins/vuetify";
import store from "./helpers/vuex/store";
/*eslint-disable */

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount("#app");