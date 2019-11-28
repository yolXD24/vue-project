const express = require("express");
const routes = express.Router();

var store = require('../modules/module.doctype');
var notify = require('../mailApi/mail'); 

routes.route('/submit/:doctype').post((req,res)=>{
    store(req.params.doctype,req.body,res);
});

routes.route('/success/email-notification').post((req,res)=>{
    notify(req.body,res);
});

module.exports = routes