const express = require('express');
const routes = express.Router();
const jwt = require('jsonwebtoken');

// Require Post model in our routes module
let models = require('./db.model');

routes.route('/admin/login').post((req, res) => {
    models.Admins.find(req.body, (err, admin) => {
        if (err) {
            res.json(err);
        } else {
            if (admin.length >= 1) {
                let token = jwt.sign({ id: admin[0] }, "secret", {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, user: admin[0] });
                // res.status(200).send({ response: { users: admin[0], login: true } });
            } else {
                return res.status(404).send('failed');
            }

        }
    });
});

routes.route('/admin/register').post((req, res) => {
    res.send(req.body.username);
})
module.exports = routes;