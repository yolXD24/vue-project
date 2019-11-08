const jwt = require("jsonwebtoken");
let models = require("../db.model");
let resStructure = require("../helpers/response");

module.exports = function (res) {
    models.Staffs.find({ admin: false }, { password: 0 }, (err, account) => {
        let token = jwt.sign({ id: account }, "docxpress");
        resStructure.data.body.accessToken=token
        res.send(resStructure);
        console.log(resStructure)
    }).catch(err => {
        if (err) {
            resStructure.status=503
            res.status(503).json({
                message: 'Service unavailable'
            });
            
        }
    });
}