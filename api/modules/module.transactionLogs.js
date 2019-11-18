const jwt = require("jsonwebtoken");
let models = require("../db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

const allTransactions = (res) => {
    models.Transactions.find({}, (err, logs) => {
        if (err) {
            response = errorResponse(503, { body: err, message: "Service unavailable" }, null)
            res.status(response.status).send(response);
        } else {
            response = successResponse(200, { logs: logs }, "Accounts retrieve successfully ! ")
            res.status(response.status).send(response);
        }
    })
}

const privateTransactions = (user, res) => {
    models.Transactions.find({ staffId: user._id }, (err, logs) => {
        if (err) {
            response = errorResponse(503, { body: err, message: "Service unavailable" }, null)
            res.status(response.status).send(response);
        } else {
            response = successResponse(200, { logs: logs }, "Accounts retrieve successfully ! ")
            res.status(response.status).send(response);
        }
    })
}
module.exports = { allTransactions, privateTransactions }