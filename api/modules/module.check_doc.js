let model = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

let cb = (err, docs, res) => {
    if (err) {
        response = errorResponse(503, err, "Service unavailable")
        return res.status(503).send(response);
    } else {
        if (!docs) {
            response = errorResponse(404, null, "Document not found!")
            return res.status(404).send(response)
        }
        response = successResponse(200, { info: docs }, "Document retrieved successfully!")
        return res.send(response)
    }
}

module.exports = (reqCode, res) => {
    const code = reqCode
    const doc = code.substring(0, 4)
    if ((/BUC_/i).test(doc)) {
        model.businessClearance.findOne({ accessCode: code }, (err, docs) => {
            cb(err, docs, res)
        })
    } else if ((/BAC_/i).test(doc)) {
        model.brgyClearance.findOne({ accessCode: code }, (err, docs) => {
            cb(err, docs, res)
        })
    } else if ((/BAI_/i).test(doc)) {
        model.brgyIndigency.findOne({ accessCode: code }, (err, docs) => {
            cb(err, docs, res)
        })
    } else {
        response = errorResponse(404, null, "Invalid Code!")
        res.status(400).send(response)
    }
}