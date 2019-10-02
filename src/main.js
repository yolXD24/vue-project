import Vue from "vue";
import App from "./App.vue";
import Router from "vue-router";
import router from "./router";
import VueAxios from '@/plugins/axios'
import vuetify from "@/plugins/vuetify";
import store from './store'
Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
    Router,
    render: h => h(App)
}).$mount("#app");

Vue.use(VueAxios);
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

// 
// https://scotch.io/tutorials/handling-authentication-in-vue-using-vuex