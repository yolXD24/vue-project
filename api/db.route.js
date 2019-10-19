const express = require("express");
const routes = express.Router();
var fs = require('fs')
var mammoth = require("mammoth");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// let models = require("./db.model");

//MODELS
var login = require("./models/model.login");
var register = require("./models/model.register");
var confirm_password = require("./models/model.confirm_pass");
var update = require("./models/model.update");
var accounts = require("./models/model.accounts");
var deleteAccount = require("./models/model.delAccount");

//account login
routes.route("/login").post((req, res) => {
    login(req.body.account.username, req.body.account.password, res);
});
//adding a staff
routes.route("/register").post((req, res) => {
    register(req.body.username, req.body.email, req.body, res);
});
//confirm password before updating its account
routes.route("/confirm_password").post((req, res) => {
        confirm_password(req.body.id, req.body.password, res);
    })
    //admin will update its profile
routes.route("/update").post((req, res) => {
        update(req.body.id, req.body.username, req.body.email, req.body.firstname, req.body.lastname, req.body.password, req.body.position, res);
    })
    // admin retrieve all accounts
routes.route("/accounts").post((req, res) => {
    accounts(res);
});
// admin delete account
routes.route("/deleteAccount").post((req, res) => {
    deleteAccount(req.body, res);
});

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

routes.route('/files/code').get((req, res) => {
    // var filePath = "./files/test.doc"
    // var file = fs.readFileSync(filePath, 'utf8');
    // res.write(file, 'binary');
    // res.end();

    mammoth.extractRawText({ path: "./files/lou_bgy._id_app.docx" })
        .then(function(result) {
            var text = result.value; // The raw text 
            var messages = result.messages;
            res.send(text);

        })
        .done();
    // res.status(200).send({ Name: "Yol Torres", Position: "Slave" })

    /*THE USE FOR THIS ONE IS TO GENERATE RANDOM CODE FOR CREATING A DOCUMENT //IT DOES NOT INCLUDE HERE IT
    IS ONLY FOR THE USER SIDE UPON SENDING HIS/HER DOCUMENT :) */

});
// routes.route('/code').post((req, res) => {
/*THE USE FOR THIS ONE IS TO GENERATE RANDOM CODE FOR CREATING A DOCUMENT //IT DOES NOT INCLUDE HERE IT
IS ONLY FOR THE USER SIDE UPON SENDING HIS/HER DOCUMENT :) */
// function makeid(length) {
//     var result = '';
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }
// console.log(makeid(8));
// let staff = new models.Codes({
//     _id: makeid(8),
//     type: "asdfsdssd"
// });
// staff
//     .save()
//     .then(() => {
//         res.status(201).json({ exist: false });
//         console.log(staff)
//     })
//     .catch(err => {
//         res.status(200).json({ exist: true });
//     });
//END HERE
// models.Codes.findById("6SZ7US9C",(err,user)=>{
//     if(!user.length){
//         console.log("Generating new code")
//     }
// })
// });

module.exports = routes;