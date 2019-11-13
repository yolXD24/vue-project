var Response = require('./response');
var response = new Response();
module.exports = (status, body, message) => {
    // response
    // response.data.body = {}
    // response.status = status
    // response.data.body.
    // response.error.message = message
    // response.error.body = body
    let error = {
        body: body,
        message: message
    }
    let data = {
        body: {
            auth: status != 200 ? false : true
        }
    }
    response.setState(status, error, data)
    return response.state
}