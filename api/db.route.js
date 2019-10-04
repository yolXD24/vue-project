const express = require('express');
const routes = express.Router();

// Require Post model in our routes module
let models = require('./db.model');

routes.route('/admin/login').post((req, res)=> {
    models.Admins.find(req.body, (err, admin)=> {
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

routes.route('/admin/register').post((req,res) =>{
    console.log(req.body)
    res.send(req.body.username);
    //I STOPPED HERE
})
module.exports = routes;