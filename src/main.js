import Vue from "vue";
import App from "./App.vue";
import router from "./system/router/index";
import vuetify from "./plugins/vuetify";
import store from "./system/functions/vuex/store";
import { rules } from "./helpers/rules"

/*eslint-disable */

Vue.config.productionTip = false;
Vue.prototype.$rules = rules();

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount("#app");