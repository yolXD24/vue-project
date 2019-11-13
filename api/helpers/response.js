// module.exports = {
//     status: 200,
//     error: { message: null, body: null },
//     data: {
//         message: null,
//         body: { accessToken: null }
//     }
// }

class Response {
    constructor() {
        this.status = 200
        this.error = { message: null, body: null }
        this.data = {
            message: null,
            body: { accessToken: null }
        }
    }
    setState(status, error, data) {
        this.status = status
        this.error = error
        this.data = data
    }

    get state() {
        return this
    }
}
module.exports = Response