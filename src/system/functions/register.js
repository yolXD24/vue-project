import store from "@/system/functions/vuex/store";
import { reject } from "q";
register = (account, _url) => {
    return new Promise((resolve, response) => {
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