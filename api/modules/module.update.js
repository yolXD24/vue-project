const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (credentials, res) => {
    var newPass = bcrypt.hashSync(credentials.password, 10)
    try {
        models.Staffs.findByIdAndUpdate(credentials._id, {
            "$set": {
                "username": credentials.username,
                "email": credentials.email,
                "firstname": credentials.firstname,
                "lastname": credentials.lastname,
                "password": newPass,
                "position": credentials.position
            },
        }, { new: true }, (err, account) => {
            if (err) {
                response = errorResponse(503, err, "Update failed!")
                res.status(response.status).send(response)

            } else {
                response = successResponse(200, {
                    default_pass: credentials.password === "docxpress.default",
                    accessToken: jwt.sign({ user: account }, "docxpress", { expiresIn: '8h' }),
                    auth: true
                }, "Update Successful!")
                res.status(response.status).send(response)

            }
        })
    } catch (err) {
        response = errorResponse(503, err, 'Internal server error!')
        res.status(response.status).send(response);
    }
}