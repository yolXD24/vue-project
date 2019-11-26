const express = require("express");
const routes = express.Router();
const jwt = require("jsonwebtoken");
//MODULES
var login = require("../modules/module.login");
var register = require("../modules/module.register");
var confirm_password = require("../modules/module.confirm_pass");
var update = require("../modules/module.update");
var accounts = require("../modules/module.accounts");
var deleteAccount = require("../modules/module.delAccount");
var verifytoken = require("../modules/module.verifytoken")
var transactions = require("../modules/module.transactionLogs")
var checkDocument = require("../modules/module.check_doc")
var saveTransaction = require("../modules/module.saveTransact");
let models = require("../model/db.model");
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
});
//admin will update its profile
routes.route("/update").post((req, res) => {
    update(req.body, res);
});
// admin retrieve all accounts
routes.route("/accounts").post((req, res) => {
    accounts(res);
});
// admin delete account
routes.route("/deleteAccount").post((req, res) => {
    deleteAccount(req.body, res);
});
// verify client token
routes.route('/verifytoken').post((req, res) => {
    verifytoken(req.body.token, res)

})

//save transaction upon printing the document
routes.route('/saveTransaction').post((req, res) => {
    // req.body = {
    //     name: "Name of user",
    //     docType: "barangay_clearance",  
    //     officer: "Yol Torres",   //NAME OF THE STAFF
    //     date: "November 30, 2019"
    // }
    // console.log(req.body)
    saveTransaction(req.body, res);

})

// admin retrieve all transactions
routes.route("/transactions").post((req, res) => {
    console.log(req.body)

    // transactions(req.body.token, res)
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

routes.route("/files/code/:code").get((req, res) => {
    checkDocument(req.params.code, res)

    //SAMPLE DATA FOR BUSINESS CLEARANCE 

    // "name": {
    //     "firstName": "chervin",
    //     "lastName": "taniloning",
    //     "middleName": "pepito",
    //     "suffix": "jr"
    //   },
    //   "businessType": "sari-sari",
    //   "dateStarted": "June 1, 2019",
    //   "address": {
    //     "sitio": "San Jose",
    //     "barangay": "Guizo",
    //     "municipality": "Mandaue",
    //     "province": "Cebu"
    //   },
    //   "docType": "Business Clearance",
    //   "accessCode": "BUC_ABCD12"

    // SAMPLE DATA FOR BRGY CLEARANCE

    // "name": {
    //     "firstName": "Cherivn",
    //     "lastName": "Tanilon",
    //     "middleName": "Pepito",
    //     "suffix": "dfg"
    //   },
    //   "age": 21,
    //   "sex": "Male",
    //   "citizenship": "Filipino",
    //   "civilStatus": "Single",
    //   "address": {
    //     "sitio": "San Jose",
    //     "barangay": "Guizo",
    //     "municipality": "Mandaue",
    //     "province": "Cebu"
    //   },
    //   "docType": "barangay-clearance",
    //   "accessCode": "BAC_ABCD34",
})




module.exports = routes;