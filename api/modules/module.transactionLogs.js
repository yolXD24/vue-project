const jwt = require("jsonwebtoken");
let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");


let response_logs = (err, logs, res) => {
    if (err) {
        response = errorResponse(503, { body: err, message: "Service unavailable" }, null)
        res.status(response.status).send(response);
    } else {
        response = successResponse(200, { logs: logs }, "Accounts retrieve successfully ! ")
        res.status(response.status).send(response);
    }
}
const allTransactions = (res) => {
    models.Transactions.find({}, (err, logs) => {
        response_logs(err, logs, res);
    })
}

const privateTransactions = (user, res) => {
    models.Transactions.find({ staffId: user._id }, (err, logs) => {
        response_logs(err, logs, res);
    })
}
module.exports = (token, res) => {
    try {
        allTransactions(res)
    } catch (err) {
        response = errorResponse(503, { body: err, message: "invalid token" }, null)
        res.status(response.status).send(response);
    }

}