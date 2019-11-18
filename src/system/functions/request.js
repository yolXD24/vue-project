import store from "@/system/functions/vuex/store";

var register = (account, _url) => {
    return new Promise((resolve, reject) => {
        store.state.axios
            .post(_url, account)
            .then(res => {
                console.log(res);
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

var update = (account, _url) => {
    return new Promise((resolve, reject) => {
        store.state.axios
            .post(_url, account)
            .then(res => {
                resolve(res.data.data)
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
export { register, update }