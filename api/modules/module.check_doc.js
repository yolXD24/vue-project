let model = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = function (reqCode, res) {
    const code = reqCode
    const doc = code.substring(0, 4)

    if (doc == "BUC_") {
        model.businessClearance.find({ accessCode: code }, (err, docs) => {
            if (err) {
                response = errorResponse(503, { body: err, message: "Service unavailable" }, null)
                return res.send(response);
            } else {
                if (docs.length == 0) {
                    response = successResponse(200, null, "Document not found!")
                    return res.send(response)
                }
                response = successResponse(200, { body: docs }, "Document retrieved successfully!")
                return res.send(response)
            }
        })
    } else if (doc == "BAC_") {
        model.brgyClearance.find({ accessCode: code }, (err, docs) => {
            if (err) {
                response = errorResponse(503, { body: err, message: "Service unavailable" }, null)
                return res.send(response);
            } else {
                if (docs.length == 0) {
                    response = successResponse(200, null, "Document not found!")
                    return res.send(response)
                }
                response = successResponse(200, { body: docs }, "Document retrieved successfully!")
                return res.send(response)
            }
        })
    }
    else if (doc == "BAI_") {
        model.brgyIndigency.find({ accessCode: code }, (err, docs) => {
            if (err) {
                response = errorResponse(503, { body: err, message: "Service unavailable" }, null)
                return res.send(response);
            } else {
                if (docs.length == 0) {
                    response = successResponse(200, null, "Document not found!")
                    return res.send(response)
                }
                response = successResponse(200, { body: docs }, "Document retrieved successfully!")
                return res.send(response)
            }
        })
    } else {
        response = successResponse(200, null, "Document not found!")
        return res.send(response)
    }

}