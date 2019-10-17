let models = require("../db.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = function (reqUsername,reqPassword,res) {
    // console.log(reqUsername)
    models.Admins.findOne({ username: reqUsername },
        (err, admin) => {
            // console.log(reqUsername)
            if (err) {
                res.json(err);
            } else {
                if (admin !== null) {
                    bcrypt.compare(reqPassword, admin.password)
                        .then(match => {
                            if (match) {
                                let token = jwt.sign({ id: admin }, "docxpress");
                                res.status(200).send({ error: false, auth: true, token: token, user: admin, default_pass: req.body.account.password === "docxpress.default" });
                            } else {
                                return res.status(202).send({ error: true, auth: false, token: null });
                            }
                        }).catch(err => {
                            console.log(err);
                            res.json(err);
                        });
                } else {
                    return res.status(200).send({ auth: false, token: null });
                }
            }
        }
    ).catch(err => {
        if (err) {
            console.log(err)
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    })
}