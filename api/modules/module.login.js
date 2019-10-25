const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let models = require("../db.model");

module.exports = function(reqUsername, reqPassword, res) {
    models.Admins.findOne({ username: reqUsername }, (err, admin) => {
        console.log(err);
        if (err) {
            res.json(err);
        } else {
            if (admin !== null) {
                bcrypt
                    .compare(reqPassword, admin.password)
                    .then(match => {
                        if (match) {
                            let token = jwt.sign({ id: admin }, "docxpress");
                            res.status(200).send({
                                error: false,
                                auth: true,
                                token: token,
                                user: admin,
                                default_pass: reqPassword === "docxpress.default"
                            });
                        } else {
                            console.log("incorrect password!");

                            return res
                                .status(202)
                                .send({ error: true, auth: false, token: null });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.json(err);
                    });
            } else {
                console.log("not found!");

                return res.status(200).send({ auth: false, token: null });
            }
        }
    }).catch(err => {
        if (err) {
            console.log(err);
            res.status(503).json({
                message: "Service unavailable"
            });
        }
    });
};