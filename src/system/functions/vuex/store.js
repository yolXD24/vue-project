import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import logs from '@/helpers/logs.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem("token"),
        defaultPassword: localStorage.getItem("default"),
        status: localStorage.getItem('status'),
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
            return state.defaultPassword;
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

                        localStorage.setItem("default", response.body.default_pass);
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
                        reject(error.response.data.error)

                    });
            })
        },
        logout({ commit }) {
            commit('logout')
            localStorage.removeItem("token");
            localStorage.removeItem("default");
            localStorage.removeItem("status");
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
                    .catch(err => {
                        reject(err)
                    });
            });
        },
        loadTable({ state }) {
            return new Promise((resolve, reject) => {
                axios
                    .post(state.url + "accounts")
                    .then(res => {
                        resolve(res.data.data.body.accounts)
                    })
                    .catch(err => {
                        reject(err);
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
                        reject(error.response.data.error);
                    });
            })
        }
    }
});