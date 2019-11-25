let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (res) => {
    models.Staffs.find({}, { password: 0 }, (err, accounts) => {
        if (err) {
            response = errorResponse(503, err, "Service unavailable")
            res.status(response.status).send(response);
        } else {
            response = successResponse(200, { accounts: accounts }, "Accounts retrieve successfully ! ")
            res.status(response.status).send(response);
        }
    })
}