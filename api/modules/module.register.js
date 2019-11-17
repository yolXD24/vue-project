let models = require("../db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");
module.exports = function(reqUsername, reqEmail, reqBody, res) {
    reqBody.firstname = reqBody.fname
    reqBody.lastname = reqBody.lname
    delete reqBody.fname;
    delete reqBody.lname;
    try {
        models.Staffs.find({ username: reqUsername, email: reqEmail },
            (err, account) => {
                if (err) {
                    response = errorResponse(503, err, "Username / Email Already Registered!!")
                    res.status(response.status).send(response);
                } else if (account.length) {
                    response = successResponse(200, { exist: true }, "Username / Email Already Registered!!")
                    res.status(response.status).send(response);
                } else {
                    let staff = new models.Staffs(reqBody);
                    staff
                        .save()
                        .then(() => {
                            response = successResponse(200, { exist: false }, "Registered Successfully!")
                            res.status(response.status).send(response);
                        })
                        .catch(err => {
                            response = errorResponse(503, err, "Username / Email Already Registered!!")
                            res.status(response.status).send(response);
                        });
                }
            }
        )
    } catch (err) {
        response = errorResponse(503, err, "Service Unavailable!")
        res.status(response.status).send(response);

    }
}