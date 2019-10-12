const express = require('express');
const routes = express.Router();
const mongoose = require('mongoose');

// Require Post model in our routes module
let models = require('./db.model');

routes.route('/login').post((req, res) => {
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

routes.route('/register').post((req, res) => {
    models.Staffs.find({ username: req.body.username, email: req.body.email }, function (err, account) {
        if (account.length) {
            res.send('Name/email exists already! Try another one.');
        } else {
            let staff = new models.Staffs(req.body);
            staff.save().then(() => {
                res.status(200).json(req.body.name.firstname + ' is added successfully');
            })
                .catch(() => {
                    res.send('Name/email exists already! Try another one.');
                })
        }
    });
});

routes.route('/code').post((req, res) => {
    //THE USE FOR THIS ONE IS TO GENERATE RANDOM CODE FOR CREATING A DOCUMENT //IT DOES NOT INCLUDE HERE
    function makeid(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
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
module.exports = routes;