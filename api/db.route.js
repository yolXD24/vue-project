const express = require('express');
const routes = express.Router();

// Require Post model in our routes module
let models = require('./db.model');

routes.route('/admin/login').post((req, res) => {
    models.Admins.find(req.body, (err, admin) => {
        if (err) {
            console.log(err)
            res.json(err);
        } else {
            if (admin.length >= 1) {
                res.status(200).send({ response: { users: admin[0], login: true } });
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
                res.status(200).json({ 'staff': req.body.name.firstname + ' is added successfully' });
            })
                .catch(() => {
                    res.status(400).send("Cannot send to database");
                })
        }
    });


})
module.exports = routes;