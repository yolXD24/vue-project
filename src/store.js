import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt_decode from 'jwt-decode'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        defaultPassword: localStorage.getItem("default"),
        status: localStorage.getItem('status'),
        user: { admin: false }
    },
    getters: {
        token: state => {
            return state.token;
        },
        defaultPassword: state => {
            return state.defaultPassword;
        },
        user: state => {
            try {
                return jwt_decode(state.token).id
            } catch (error) {
                return { admin: false }
            }
        },
        status: state => { return state.status }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', state.token)
        },
        auth_success(state) {
            state.status = true
            localStorage.setItem('status', state.status)

        },
        auth_error(state) {
            state.status = false
            localStorage.setItem('status', state.status)

        },
        logout(state) {
            localStorage.removeItem('status')
            state.status = false;
            state.user = { admin: false }
            console.log(typeof state.token);

        },
        setUser(state, res) {
            state.user = jwt_decode(res.data.token).id
        }
    },
    actions: {
        login({ commit }, credentials) {
            return new Promise((resolve, reject) => {
                const url = "http://localhost:4000/admin/login";
                axios
                    .post(url, { account: credentials })
                    .then(res => {
                        localStorage.setItem("default", res.data.default_pass);
                        if (res.data.auth) {
                            commit('setToken', res.data.token)
                            commit('auth_success', true)
                            commit('setUser', res)
                        } else {
                            commit('auth_error')
                        }
                        resolve(res)
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    });
            })
        },

        logout({ commit }) {
            commit('logout')
            localStorage.removeItem("token");
            localStorage.removeItem("default");
        },
        register({ commit }, credentials) {

        }
    }
});