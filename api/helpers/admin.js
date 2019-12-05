let models = require("../model/db.model");
let response = null
let errorResponse = require("../helpers/setErrorResponse");
let successResponse = require("../helpers/setSuccessResponse");

module.exports = (res) => {
    models.Staffs.find({admin:true}, (err, accounts) => {
        if (err) {
            response = errorResponse(503, err, "Service unavailable")
            res.status(response.status).send(response);
        } else {
            var admin = new models.Staffs({
                    "username": "yol",
                    "firstname": "Yol",
                    "lastname": "Torres",
                    "email": "yol@gmail.com",
                    "position": "Brgy. Captain",
                    "admin": true,
                    "password": "$2a$10$oLTah2qxKCONwwB5ZSCUku/Gr2eAXKBopVAF3Noc51GmDfpiz6tES",
                 })
                 admin.save((err , saved)=>{
                  if(!err){
                      res.send(saved)}else{
                      res.status(500).send(err)
                  }
                 })
        }
    })
}
