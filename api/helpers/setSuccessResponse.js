let response = require("../helpers/response");

module.exports = (status, body, message) => {
    response.error = {}
    response.status = status
    response.data.body = body
    response.data.message = message
    return response
}