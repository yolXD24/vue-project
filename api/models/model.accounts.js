const jwt = require("jsonwebtoken");
let models = require("../db.model");
module.exports = function (res) {
    models.Staffs.find({ admin: false }, { password: 0 }, (err, account) => {
        let token = jwt.sign({ id: account }, "docxpress");
        res.status(200).send({ accounts: token });
    }).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    });
}