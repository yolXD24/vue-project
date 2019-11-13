let response = require("../helpers/response");
module.exports = (status, body, message) => {
    response.data.body = {}
    response.status = status
    response.data.body.auth = status != 200 ? false : true
    response.error.message = message
    response.error.body = body
    return response
}