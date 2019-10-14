const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Require Post model in our routes module
let models = require("./db.model");

routes.route("/admin/login").post((req, res) => {
    models.Admins.findOne({ username: req.body.account.username },
        (err, admin) => {
            if (err) {
                res.json(err);
            } else {
                if (admin !== null) {
                    bcrypt.compare(req.body.account.password, admin.password, (
                        err, resp) => {
                        if (resp) {
                            let token = jwt.sign({ id: admin }, "docxpress");
                            res.status(200).send({ auth: true, token: token, user: admin });
                        } else {
                            return res.status(202).send({ auth: false, token: null });
                        }
                    });
                } else {
                    return res.status(202).send({ auth: false, token: null });
                }
            }
        }
    );
});

routes.route("/admin/register").post((req, res) => {
    models.Staffs.find({ username: req.body.username, email: req.body.email },
        (err, account) => {
            if (account.length) {
                res.status(200).json({ exist: true });
            } else {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    // Store hash in database
                    req.body.password = req.body.password = hash;
                    let staff = new models.Staffs(req.body);
                    staff
                        .save()
                        .then(() => {
                            res.status(200).json({ exist: false });
                        })
                        .catch(err => {
                            res.status(200).json({ exist: true });
                            throw err;
                        });
                });
            }
        }
    );
});

module.exports = routes;