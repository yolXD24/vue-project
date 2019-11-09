const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../db.model");
let res_layout = require("../helpers/response");

module.exports = function (reqUsername, reqPassword, res) {
    models.Admins.findOne({ username: reqUsername }, (err, admin) => {
        console.log(err);
        if (err) {
            res_layout.error.message = err
            res.send(res_layout);
        } else {
            if (admin !== null) {
                bcrypt
                    .compare(reqPassword, admin.password)
                    .then(match => {
                        if (match) {
                            delete admin.password
                            let token = jwt.sign({ user: admin }, "docxpress");
                            res_layout.data.body.auth = true
                            res_layout.data.body.accessToken = token
                            res_layout.data.body.default_pass = reqPassword === "docxpress.default"
                            res.send(res_layout);
                        } else {
                            res_layout.data.body.error=true
                            return res.send(res_layout);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res_layout.error.body=err
                        res.send(res_layout);
                    });
            } else {
                console.log("not found!");
                return res.send(res_layout);
            }
        }
    }).catch(err => {
        if (err) {
            console.log(err);
            res_layout.error.message="Service unavailable"
            res_layout.status=503
            res_layout.error.body=err
            res.send(res_layout);
        }
    });
};