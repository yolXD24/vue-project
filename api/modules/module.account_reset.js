let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
let bcrypt = require('bcryptjs');

module.exports = (account_id, res) => {
    console.log(account_id);

    try {
        models.Staffs.findByIdAndUpdate(account_id, {
            $set: {
                password: bcrypt.hashSync("docxpress.default", 10),
            },
        }, { new: true }, (err, account) => {
            if (err) {
                response = errorResponse(503, err, "Reset failed!")
                res.status(response.status).send(response)

            } else {
                response = successResponse(200, {
                    reset: true,
                }, "Reset Successful!")
                res.status(response.status).send(response);
            }
        })
    } catch (err) {
        console.log(err);

        response = errorResponse(503, err, 'Internal server error!')
        res.status(response.status).send(response);
    }
}