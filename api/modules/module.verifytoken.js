const jwt = require("jsonwebtoken");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (token, res) => {
    jwt.verify(token, 'docxpress', function(err, decoded) {
        if (err) {
            response = errorResponse(503, err, "Token is invalid")
        } else {
            response = successResponse(200, { valid: true }, "Verified!")
        }
        console.log(response);
        res.status(response.status).send(response)
    });
}