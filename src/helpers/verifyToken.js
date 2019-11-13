import store from "@/system/functions/vuex/store";
const axios = store.state.axios
export default {
    name: "VerifyToken",
    VerifyToken() {
        return new Promise((resolve, reject) => {
            axios.post(store.state.url + "verifytoken")
                .then(res => {
                    resolve(res.data.body.accessToken)
                }).catch(err => {
                    reject(err)
                })
        })
    }
}