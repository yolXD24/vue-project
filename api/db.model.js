const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Define collection and schema for Post
let Admin = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: "staff"
});

let Staff = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    position: {
        type: String
    },
    admin: {
        type: Boolean
    },
    password: {
        type: String
    }
}, {
    collection: "staff"
});

let Code = new Schema({
    _id: String,
    type: String
}, {
    collection: "codes"
});
/**
 * Need object model for transaction
 *  {
        name : name of user,
        request : type of document request by the user,
        officer : officer in charge(id of the officer(maybe)),
        date:date of transaction
    },

    {


        log in
    "_id": {
        "$oid": "5da418fef0c56d87ec0b5de4"
    },
    "username": "yol",
    "firstname": "Yol",
    "lastname": "Torres",
    "email": "yol@gmail.com",
    "position": "Brgy. Captain",
    "admin": true,
    "password": "$2a$10$oLTah2qxKCONwwB5ZSCUku/Gr2eAXKBopVAF3Noc51GmDfpiz6tES",
    "__v": 0
}
 */

Staff.pre("save", function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const Admins = mongoose.model("Admin", Admin);
const Staffs = mongoose.model("Staff", Staff);
const Codes = mongoose.model("Code", Code);
module.exports = { Admins, Staffs, Codes };