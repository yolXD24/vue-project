const bcrypt = require("bcryptjs");
let models = require("../db.model");
let res_layout = require("../helpers/response");
module.exports = function (reqId, reqPass, res) {
    models.Staffs.findById(reqId, (err, account) => {
        console.log("!account")
        if (account !== null) {
            bcrypt.compare(reqPass, account.password)
                .then(match => {
                    if (match) {
                        console.log("found")
                        res_layout.data.body.confirm=true
                        res.send(res_layout)
                    } else {
                        console.log("!found")
                        res_layout.data.body.error=true
                        res.status(200).send(res_layout)
                        return
                    }
                }).catch(err => {
                    console.log("!found")
                    res_layout.error.body=err
                    res.send(res_layout);
                });
        } else {
            res_layout.data.body.error=true
            res.send(res_layout)
        }
    }).catch(err => {
        if (err) {
            res_layout.status=503
            res_layout.error.message="Service unavailable"
            res_layout.error.body=err
            res.send(res_layout);
        }
    })
}