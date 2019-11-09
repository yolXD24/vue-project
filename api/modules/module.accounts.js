const jwt = require("jsonwebtoken");
let models = require("../db.model");
let resStructure = require("../helpers/response");

module.exports = function(res) {
    models.Staffs.find({ admin: false }, { password: 0 }, (err, account) => {
        let token = jwt.sign({ accounts: account }, "docxpress");
        resStructure.data.body.accessToken = token
        resStructure.data.message = "accounts retrieved successfully!"
        res.send(resStructure);
    }).catch(err => {
        if (err) {
            resStructure.status = 503
            resStructure.error.body = err
            resStructure.error.message = "Service unavailable"
            res.status(resStructure.status).send(resStructure);

        }
    });
}