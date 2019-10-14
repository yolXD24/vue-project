const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Require Post model in our routes module
let models = require("./db.model");

routes.route("/admin/login").post((req, res) => {
    // ok na  ni decrytion added !

    models.Admins.findOne({ username: req.body.account.username },
        (err, admin) => {
            if (err) {
                res.json(err);
            } else {
                if (admin !== null) {
                    bcrypt.compare(
                        req.body.account.password,
                        admin.password,
                        (err, resp) => {
                            if (resp) {
                                let token = jwt.sign({ id: admin }, "docxpress");
                                res.status(200).send({ auth: true, token: token, user: admin });
                            } else {
                                return res.status(202).send({ auth: false, token: null });
                            }
                        }
                    );
                } else {
                    return res.status(202).send({ auth: false, token: null });
                }
            }
        }
    );
});

routes.route("/admin/login").post((req, res) => {
    models.Admins.findOne({ username: req.body.account.username },
        (err, admin) => {
            if (err) {
                res.json(err);
            } else {
                if (admin !== null) {
                    bcrypt.compare(
                        req.body.account.password,
                        admin.password,
                        (err, resp) => {
                            if (resp) {
                                let token = jwt.sign({ id: admin }, "docxpress");
                                res.status(200).send({ auth: true, token: token, user: admin });
                            } else {
                                return res.status(202).send({ auth: false, token: null });
                            }
                        }
                    );
                } else {
                    return res.status(202).send({ auth: false, token: null });
                }
            }
        }
    );
});

routes.route("/admin/register").post((req, res) => {
    // ok na ni encrytion added !
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
// admin retrieve all accounts
routes.route("/admin/accounts").post((req, res) => {
    // ok na ni 
    models.Staffs.find({}, { password: 0, admin: 0 }, (err, account) => {
        res.status(200).json(account);
    });
});

// admin delete account
routes.route("/admin/deleteAccount").post((req, res) => {
    models.Staffs.findOneAndRemove(
        req.body, { password: 0, admin: 0 },
        (err, account) => {
            if (!err) {
                return res.status(200).json(true);
            } else {
                return res.status(200).json(false);
            }
        }
    );
});

// admin retrieve all transactions
routes.route("/history/transactions").post((req, res) => {
    /*  NOTE!!
       1.I send my id of the staff , if admin all transaction will be retrieve
       2.if not admin retrieve transaction for that staff only
       3.this is the transaction object
              {
                name:name of user,
              request:type of document request by the user,
                officer:officer in charge,
                date:date of transaction
              },
      4.response should be array of transaction objects
      thanks 
      ^__^
      */
});

module.exports = routes;