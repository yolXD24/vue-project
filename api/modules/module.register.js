let models = require("../db.model");
let res_layout = require("../helpers/response");

module.exports = function(reqUsername, reqEmail, reqBody, res) {
    reqBody.firstname = reqBody.fname
    reqBody.lastname = reqBody.lname
    delete reqBody.fname;
    delete reqBody.lname;
    console.log(reqBody);

    models.Staffs.find({ username: reqUsername, email: reqEmail },
        (err, account) => {
            if (account.length) {
                res_layout.data.body.exist=true
                res.send(res_layout);
            } else {
                let staff = new models.Staffs(reqBody);
                staff
                    .save()
                    .then(() => {
                        res_layout.status=201
                        res.send(res_layout);
                    })
                    .catch(err => {
                        res_layout.data.body.exist=true
                        res.send(res_layout);
                    });
            }
        }
    ).catch(err => {
        if (err) {
            res_layout.error.message="Service unavailable"
            res_layout.error.body=err
            res_layout.status=503
            res.send(res_layout);
        }
    })
}