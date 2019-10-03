const express = require('express');
const routes = express.Router();

// Require Post model in our routes module
let models = require('./db.model');

routes.route('/admin/login').post(function (req, res) {
    models.Admins.find(req.body, function (err, admin) {
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

module.exports = routes;