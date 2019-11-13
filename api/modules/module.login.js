const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = function(reqUsername, reqPassword, res) {
    models.Admins.findOne({ username: reqUsername }, (err, admin) => {
        if (err) {
            response = errorResponse(503, err, "Service Unavailable!")
            res.status(response.status).send(response);
        } else {
            if (admin !== null) {
                bcrypt
                    .compare(reqPassword, admin.password)
                    .then(match => {
                        if (match) {
                            delete admin.password
                            response = successResponse(200, {
                                default_pass: reqPassword === "docxpress.default",
                                accessToken: jwt.sign({ user: admin }, "docxpress", { expiresIn: '8h' }),
                                auth: true
                            }, "Login Successful!")

                        } else {
                            response = errorResponse(404, null, "Password is incorrect!")

                        }
                        res.status(response.status).send(response);
                    })
                    .catch(err => {
                        response = errorResponse(404, err, "Username is not registered!")
                        res.status(response.status).send(response);
                    });
            } else {
                response = errorResponse(404, err, "Account is not Found!")
                res.status(response.status).send(response);
            }
        }
    })
};