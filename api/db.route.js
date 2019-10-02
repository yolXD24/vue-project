const express = require('express');
const routes = express.Router();

// Require Post model in our routes module
let models = require('./db.model');

// Defined get data(index or listing) route
routes.route('/admin/login').post(function(req, res) {
    models.Admins.find(function(err, admin) {
        var user = admin[0].username
        var pass = admin[0].password

        if (err) {
            res.json(err);
        } else {
            res.json(user + " " + pass);
        }
    });
});

module.exports = routes;