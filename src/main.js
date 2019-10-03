import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import router from "./router";
import VueAxios from '@/plugins/axios'
import vuetify from "@/plugins/vuetify";
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}
new Vue({
    router,
    vuetify,
    Router,
    render: h => h(App)
}).$mount("#app");

Vue.use(VueAxios);
