let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
module.exports = function(reqUsername, reqEmail, reqBody, res) {
    reqBody.firstname = reqBody.fname
    reqBody.lastname = reqBody.lname
    delete reqBody.fname;
    delete reqBody.lname;
    models.Staffs.find({ $or: [{ username: reqUsername }, { email: reqEmail }] },
        (err, account) => {
            if (err) {
                response = errorResponse(503, err, "Service Unavailable!")
                res.status(response.status).send(response);
            } else if (account.length) {
                response = errorResponse(406, { exist: true }, " Account already exist!")
                res.status(response.status).send(response);

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
        response = errorResponse(503, err, "Service Unavailable!")
        res.status(response.status).send(response);

    })
}