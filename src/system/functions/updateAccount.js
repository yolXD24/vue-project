import store from "@/system/functions/vuex/store";
var update = (account, _url) => {
    return new Promise((resolve, reject) => {
        store.state.axios
            .post(_url, account)
            .then(res => {
                resolve(res.data.data)
            })
            .catch(error => {
                reject(error.response.data.error)
            });
    })
}

export { update }