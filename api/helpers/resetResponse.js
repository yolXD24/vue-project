var response = require("./response")

module.exports = () => {
    response = {
        status: 200,
        error: { message: null, body: null },
        data: {
            message: null,
            body: { accessToken: null }
        },
    }
    return response;
}