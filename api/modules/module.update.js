const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (reqId, reqUser, reqEmail, reqFname, reqLname, reqPass, reqPosition, res) => {

    models.Staffs.findOneAndUpdate({ "_id": reqId }, {
        "$set": {
            "username": reqUser,
            "email": reqEmail,
            "firstname": reqFname,
            "lastname": reqLname,
            "password": reqPass,
            "position": reqPosition
        },
    }, { new: true }, (err, account) => {
        if (err) {
            response = errorResponse(503, err, "Update failed!")
        } else {
            console.log(account);
            response = successResponse(200, {
                default_pass: reqPass === "docxpress.default",
                accessToken: jwt.sign({ user: account }, "docxpress", { expiresIn: '8h' }),
                auth: true
            }, "Update Successful!")
        }
        res.status(response.status).send(response)
    })
    // reqPass = bcrypt.hashSync(reqPass, 10);
    // models.Staffs.findOneAndUpdate({ "_id": reqId }, {
    //     "$set": {
    //         "username": reqUser,
    //         "email": reqEmail,
    //         "firstname": reqFname,
    //         "lastname": reqLname,
    //         "password": reqPass,
    //         "position": reqPosition
    //     }

    // }).exec((err, account) => {
    //     if (err) {
    //         response = errorResponse(503, err, "Update failed!")
    //         console.log(account);
    //     } else {
    //         console.log(account);
    //         response = successResponse(200, {
    //             default_pass: reqPass === "docxpress.default",
    //             accessToken: jwt.sign({ user: account }, "docxpress", { expiresIn: '8h' }),
    //             auth: true
    //         }, "Update Successful!")
    //     }
    //     res.status(response.status).send(response)
    // })
}