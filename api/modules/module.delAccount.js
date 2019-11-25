let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (reqBody, res) => {
    models.Staffs.findOneAndRemove(
        reqBody, { password: 0, admin: 0 },
        (err, account) => {
            if (!err) {
                response = successResponse(200, { success: true }, "Deleted Successfully!")
                return res.status(response.status).send(response);
            } else {
                response = errorResponse(503, err, null)
                return res.status(response.status).send(response);
            }
        }
    ).catch(err => {
        response = errorResponse(503, err, null)
        return res.status(response.status).send(response);
    });

}