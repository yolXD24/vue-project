import store from "@/system/functions/vuex/store";
import { resolve } from "dns";
import { reject } from "q";
var update = (account, _url) => {
    store.state.axios
        .post(_url, account)
        .then(res => {
            resolve(res.data.data)
        })
        .catch(error => {
            reject(error.response.data.error)
        });
}

export { update }