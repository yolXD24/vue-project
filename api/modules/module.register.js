let models = require("../db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
module.exports = function(reqUsername, reqEmail, reqBody, res) {
    reqBody.firstname = reqBody.fname
    reqBody.lastname = reqBody.lname
    delete reqBody.fname;
    delete reqBody.lname;
    models.Staffs.find({ username: reqUsername, email: reqEmail },
        (err, account) => {
            if (err) {
                response = errorResponse(503, err, "Service Unavailable!")
            } else if (account.length) {
                response = successResponse(200, { exist: true }, "Service Unavailable!")

            } else {
                let staff = new models.Staffs(reqBody);
                staff
                    .save()
                    .then(() => {
                        response = successResponse(200, account, "Registered Successfully!")
                        res.status(response.status).send(response);
                    })
                    .catch(err => {
                        response = errorResponse(503, err, "Service Unavailable!")
                        res.status(response.status).send(response);

                    });
            }
        }
    ).catch(err => {
        if (err) {
            response = errorResponse(503, err, "Service Unavailable!")
            res.status(response.status).send(response);
        }
    })
}