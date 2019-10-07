import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import VueAxios from "@/plugins/axios";
import vuetify from "@/plugins/vuetify";

Vue.config.productionTip = false;

new Vue({
  router: router,
  vuetify,
  render: h => h(App)
}).$mount("#app");

Vue.use(VueAxios);
