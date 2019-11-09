const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../db.model");
let res_layout = require("../helpers/response");

module.exports = function(reqId, reqUser, reqEmail, reqFname, reqLname, reqPass, reqPosition, res) {
    reqPass = bcrypt.hashSync(reqPass, 10);
    models.Staffs.findOneAndUpdate({ "_id": reqId }, {
        "$set": {
            "username": reqUser,
            "email": reqEmail,
            "firstname": reqFname,
            "lastname": reqLname,
            "password": reqPass,
            "position": reqPosition
        }

    }).exec(function(err, account) {

        if (err) throw err;
        console.log("updated successfully")
        let token = jwt.sign({ id: account }, "docxpress");
        res_layout.data.body.auth=true
        res_layout.data.body.accessToken=token
        res_layout.data.body.user=account
        res_layout.data.body.default_pass=account.password === "docxpress.default" 
        res.send(res_layout);

    })
}