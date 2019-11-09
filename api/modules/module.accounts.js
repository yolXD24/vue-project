const jwt = require("jsonwebtoken");
let models = require("../db.model");
let res_layout = require("../helpers/response");

module.exports = function (res) {
    models.Staffs.find({ admin: false }, { password: 0 }, (err, account) => {
        let token = jwt.sign({ id: account }, "docxpress");
        res_layout.data.body.accessToken=token
        res.send(res_layout);
        console.log(res_layout)
    }).catch(err => {
        if (err) {
            res_layout.status=503
            res_layout.error.message="Service unavailable"
            res_layout.error.body=err
            res.send(res_layout); 
        }
    });
}