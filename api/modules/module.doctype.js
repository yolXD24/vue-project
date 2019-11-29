let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

let cb = (document, res) => {
    document.save()
        .then((result) => {
            response = successResponse(201, { "access_code": result.accessCode }, "Document has been sent");
            res.send(response);
        })
        .catch(err => {
            if (err.code === 11000) {
                store(docType, document, res)
            } else {
                response = errorResponse(503, err, "Service Unavailable");
                res.send(response);
            }
        });
}

const store = (docType, document, res) => {
    switch (docType) {
        case 'barangay-clearance':
            document["accessCode"] = "BAC_" + code();
            let brgyClearance = new models.brgyClearance(document);
            cb(brgyClearance, res);
            break;
        case 'barangay-indigency':
            document["accessCode"] = "BAI_" + code();
            let brgyIndigency = new models.brgyIndigency(document);
            cb(brgyIndigency, res);
            break;
        case 'business-clearance':
            document["accessCode"] = "BUC_" + code();
            let clearance = new models.businessClearance(document);
            cb(clearance, res);
            break;
    }
};

let code = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = store;