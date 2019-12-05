let models = require("../model/db.model");
let response = null;
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = function(reqBody, res) {
    // data to pass
    // {
    // name: String,
    // docType: String,
    // officer: String,
    // date: Date
    // }
    let transaction = new models.Transactions(reqBody);

    transaction.save((err, log) => {
        if (err) {
            console.log(err);

            response = errorResponse(400, err, "Failed to save transaction!")
            return res.status(response.status).send(response);
        } else {
            console.log(log)
            response = successResponse(200, log, "Transaction saved successfully!")
            return res.status(response.status).send(response)
        }
    });
}