const express = require('express');
const routes = express.Router();

// Require Post model in our routes module
let models = require('./db.model');

routes.route('/admin/login').post((req, res) => {
    models.Staffs.find(req.body, (err, admin) => {
        if (err) {
            console.log(err)
            res.json(err);
        } else {
            if (admin.length >= 1) {
                res.status(200).send({ response: { user: admin[0].name.firstname, login: true } });
            } else {
                console.log("error!")
                res.status(200).send({ response: { login: false } });
            }
        }
    });
});

routes.route('/admin/register').post((req, res) => {
    models.Staffs.find({ username: req.body.username, email: req.body.email }, function (err, account) {
        if (account.length) {
            res.send('Name/email exists already! Try another one.');
        } else {
            let staff = new models.Staffs(req.body);
            staff.save().then(() => {
                res.status(200).json(req.body.name.firstname + ' is added successfully' );
            })
                .catch(() => {
                    res.send('Name/email exists already! Try another one.');
                })
        }
    });


})
module.exports = routes;