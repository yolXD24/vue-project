import store from "@/system/functions/vuex/store";
const axios = store.state.axios


let verifyToken = () => {
    return new Promise((resolve, reject) => {
        axios.post(store.state.url + "verifytoken", { token: store.getters.token })
            .then(res => {
                resolve(res.data.data.body.valid)
            }).catch(err => {
                reject(err)
            })
    })
}

export { verifyToken }