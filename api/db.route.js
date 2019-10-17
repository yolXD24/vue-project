const express = require("express");
const routes = express.Router();
<<<<<<< HEAD
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
=======
const mongoose = require('mongoose');

>>>>>>> 54a35e4704b9a7b9e2f25a166898d46d1e5bcb5c
// Require Post model in our routes module
let models = require("./db.model");

routes.route("/login").post((req, res) => {
    // ok na  ni decrytion added !

<<<<<<< HEAD
    models.Admins.findOne({ username: req.body.account.username },
        (err, admin) => {
            if (err) {
                res.json(err);
            } else {
                if (admin !== null) {
                    bcrypt.compare(req.body.account.password, admin.password)
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
=======
routes.route('/login').post((req, res) => {
    models.Staffs.find(req.body, (err, admin) => {
>>>>>>> 54a35e4704b9a7b9e2f25a166898d46d1e5bcb5c
        if (err) {
            console.log(err)
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    })
});

routes.route("/register").post((req, res) => {

    // ok na ni encrytion added !
    models.Staffs.find({ username: req.body.username, email: req.body.email },
        (err, account) => {
            if (account.length) {
                res.status(200).json({ exist: true });
            } else {
                let staff = new models.Staffs(req.body);
                staff
                    .save()
                    .then(() => {
                        res.status(201).json({ exist: false });
                    })
                    .catch(err => {
                        res.status(200).json({ exist: true });
                    });
            }
        }
    ).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
        }
    })
});
routes.route("/confirm_password").post((req, res) => {
    console.log(req.body)

    models.Staffs.findById(req.body.id, (err, account) => {
        console.log("!account")

        if (account !== null) {
            bcrypt.compare(req.body.password, account.password)
                .then(match => {
                    if (match) {
                        console.log("found")
                        res.status(200).send({ error: false, confirm: true })
                    } else {
                        console.log("!found")

                        res.status(200).send({ error: true, confirm: false })
                        return
                    }
                }).catch(err => {
                    console.log("!found")
                    res.json(err);
                });
        } else {
<<<<<<< HEAD
            res.status(200).send({ error: true, confirm: false })

        }
    })

})
routes.route("/update").post((req, res) => {
    models.Staffs.findOneAndUpdate(req.body.id,
        {
            "$set":
            {
                "username": req.body.username,
                "email": req.body.email,
                "firstname": req.body.firstname,
                "lastname": req.body.lastname,
                "password": req.body.password,
                "position": req.body.position
            }
        }).exec(function (err, book) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
=======
            if (admin.length >= 1) {
                res.status(200).send({ response: { user: admin[0].name.firstname, login: true } });
>>>>>>> 54a35e4704b9a7b9e2f25a166898d46d1e5bcb5c
            } else {
                res.status(200).send(book);
            }
<<<<<<< HEAD
        });
})
// admin retrieve all accounts
routes.route("/accounts").post((req, res) => {
    // ok na ni 
    models.Staffs.find({ admin: false }, { password: 0 }, (err, account) => {
        let token = jwt.sign({ id: account }, "docxpress");
        res.status(200).send({ accounts: token });
    }).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
=======
        }
    });
});

routes.route('/register').post((req, res) => {
    models.Staffs.find({ username: req.body.username, email: req.body.email }, function (err, account) {
        if (account.length) {
            res.send('Name/email exists already! Try another one.');
        } else {
            let staff = new models.Staffs(req.body);
            staff.save().then(() => {
                res.status(200).json(req.body.name.firstname + ' is added successfully');
                console.log(staff);
            })
                .catch(() => {
                    res.send('Name/email exists already! Try another one.');
                })
>>>>>>> 54a35e4704b9a7b9e2f25a166898d46d1e5bcb5c
        }
    });
});

<<<<<<< HEAD
// admin delete account
routes.route("/deleteAccount").post((req, res) => {
    models.Staffs.findOneAndRemove(
        req.body, { password: 0, admin: 0 },
        (err, account) => {
            if (!err) {
                return res.status(200).json(true);
            } else {
                return res.status(200).json(false);
            }
        }
    ).catch(err => {
        if (err) {
            res.status(503).json({
                message: 'Service unavailable'
            });
=======
routes.route('/code').post((req, res) => {
    //THE USE FOR THIS ONE IS TO GENERATE RANDOM CODE FOR CREATING A DOCUMENT //IT DOES NOT INCLUDE HERE
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
>>>>>>> 54a35e4704b9a7b9e2f25a166898d46d1e5bcb5c
        }
        return result;
    }
    console.log(makeid(8));
    //END HERE


    models.Codes.find({ id: req.body.code }, (err, data) => {
        console.log(data);
        res.json(data);
    }).catch(() => {
        res.status(404).json('ID Not Found');
    });

});

<<<<<<< HEAD
// admin retrieve all transactions
routes.route("/transactions").post((req, res) => {
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

// routes.route('/code').post((req, res) => {
/*THE USE FOR THIS ONE IS TO GENERATE RANDOM CODE FOR CREATING A DOCUMENT //IT DOES NOT INCLUDE HERE IT
IS ONLY FOR THE USER SIDE UPON SENDING HIS/HER DOCUMENT :) */
//     function makeid(length) {
//         var result = '';
//         var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//         var charactersLength = characters.length;
//         for (var i = 0; i < length; i++) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         }
//         return result;
//     }
//     // console.log(makeid(8));
//     //END HERE

//     models.Codes.find({ code: req.body.code }, (err, doc) => {
//         console.log(doc);
//         res.json(doc);
//     }).catch(() => {
//         res.status(404).json('ID Not Found');
//     });
// });

=======
routes.route('/update').post((req, res) => {
    models.Staffs.findOne({ email: req.body.email }, (err, staff) => {
        if (err) throw err;
        staff.account.username = req.body.account.username;
        staff.account.password = req.body.account.password;
        staff.name.firstname = req.body.name.firstname;
        staff.name.lastname = req.body.name.lastname;
        staff.email = req.body.email;
        staff.position = req.body.position;
        console.log(staff);

        staff.save().then(() => {
            console.log('User successfully updated!');
            res.status(200).json(req.body.name.firstname + ' is updated successfully');
        }).catch(() => {
            res.json('Cannot update the account');
        });

    });
})
>>>>>>> 54a35e4704b9a7b9e2f25a166898d46d1e5bcb5c
module.exports = routes;