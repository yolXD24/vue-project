import store from "@/system/functions/vuex/store";
register = (account, _url) => {
    return new Promise((resolve, reject) => {
        store.state.axios
            .post(_url, account)
            .then(res => {
                resolve(res.data.data)
            })
            .catch(err => {
                reject(error.response.data.error)
            });
    })
}
export { register }