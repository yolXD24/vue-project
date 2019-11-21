import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import logs from '@/helpers/logs.js'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        status: localStorage.getItem('status'),
        default_pass: localStorage.getItem('default'),
        user: { admin: false },
        url: "http://localhost:4000/admin/",
        logs,
        axios
    },
    getters: {
        token: state => {
            return state.token;
        },
        defaultPassword: state => {
            state.default_pass = localStorage.getItem("default") == 'true' ? true : false
            return state.default_pass
        },
        user: state => {
            try {
                return jwt_decode(state.token).user
            } catch (error) {
                return { admin: false }
            }
        },
        status: state => { return state.status },
        logs: state => { return state.logs.logs }
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', state.token);
        },
        setDefault(state, val) {
            state.default_pass = val
            localStorage.setItem("default", val);
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
            state.status = false;
            state.user = { admin: false }
            localStorage.removeItem("token");
            localStorage.removeItem("default");
            localStorage.removeItem("status");
        },
        setUser(state) {
            state.user = jwt_decode(state.token).user
            state.logs.user = state.user
        }
    },
    actions: {
        login({ commit, getters, state }, credentials) {
            return new Promise((resolve, reject) => {
                axios
                    .post(state.url + "login", { account: credentials })
                    .then(res => {
                        var response = res.data.data
                        commit("setDefault", response.body.default_pass);
                        if (response.body.auth) {
                            commit('setToken', response.body.accessToken)
                            commit('auth_success')
                            commit('setUser')
                        } else {
                            commit('auth_error')
                        }
                        resolve(getters.status)
                    })
                    .catch(error => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        let errors = {}
                        if (!error.response) {
                            errors = { message: "Cannot connect to the server!" }
                        } else {
                            errors = error.response.data.error
                        }
                        reject(errors)
                    });
            })
        },
        logout({ commit }) {
            commit('logout')
        },
        deleteAccount({ state }, account) {
            return new Promise((resolve, reject) => {
                axios
                    .post(state.url + "deleteAccount", { _id: account._id })
                    .then(res => {
                        if (res.data) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    })
                    .catch(error => {
                        let errors = {}
                        if (!error.response) {
                            errors = { message: "Cannot connect to the server!" }
                        } else {
                            errors = error.response.data.error
                        }
                        reject(errors)
                    });
            });
        },
        loadAccountTable({ state }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(state.url + "accounts")
                    .then(res => {
                        resolve(res.data.data.body.accounts)
                    })
                    .catch(error => {
                        let errors = {}
                        if (!error.response) {
                            errors = { message: "Cannot connect to the server!" }
                        } else {
                            errors = error.response.data.error
                        }
                        reject(errors)
                    });
            })
        },
        loadHistoryTable({ state }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(state.url + "transactions", { token: state.token })
                    .then(res => {
                        resolve(res.data.data.body.logs)
                    })
                    .catch(error => {
                        let errors = {}
                        if (!error.response) {
                            errors = { message: "Cannot connect to the server!" }
                        } else {
                            errors = error.response.data.error
                        }
                        reject(errors)
                    });
            })
        },
        confirmPass({ state }, account) {
            return new Promise((resolve, reject) => {
                axios
                    .post(state.url + "confirm_password", account)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(error => {
                        let errors = {}
                        if (!error.response) {
                            errors = { message: "Cannot connect to the server!" }
                        } else {
                            errors = error.response.data.error
                        }
                        reject(errors)
                    });
            })
        }
    }
});