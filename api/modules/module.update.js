const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../db.model");
// let response = require("../helpers/response");

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
        let token = jwt.sign({ id: account }, "docxpress", { expiresIn: '8h' });
        res.status(200).send({ error: false, auth: true, token: token, user: account, default_pass: account.password === "docxpress.default" });

    })
}