const bcrypt = require("bcryptjs");
let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = function(reqId, reqPass, res) {
    models.Staffs.findById(reqId, (err, account) => {
        if (account !== null) {
            bcrypt.compare(reqPass, account.password)
                .then(match => {
                    if (match) {
                        response = successResponse(200, {
                            confirm: true
                        }, "Password Confirmed!")
                    } else {
                        response = errorResponse(404, null, "Password is incorrect!")
                    }
                    res.status(response.status).send(response)
                }).catch(err => {
                    response = errorResponse(503, err, "Cannot find requested credentials!")
                    res.status(response.status).send(response)
                });
        } else {

        }
    }).catch(err => {
        if (err) {
            response = errorResponse(503, err, "Service Unavailable!")
            res.status(response.status).send(response)
        }
    })
}