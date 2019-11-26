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

let TransactionSchema = new Schema({
    name: String,
    docType: String,
    officer: String,
    date: String
}, {
    collection: "logs"
})


//USER MODELS
let brgyClearanceSchema = new Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, required: false },
        suffix: { type: String, required: false }
    },
    age: Number,
    sex: String,
    citizenship: String,
    civilStatus: String,
    address: {
        sitio: String,
        barangay: String,
        municipality: String,
        province: String
    },
    docType: String,
    accessCode: String
}, {
    collection: "barangay_clearance"
});

let brgyIndigencySchema = new Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, required: false },
        suffix: { type: String, required: false }
    },
    age: Number,
    sex: String,
    address: {
        sitio: String,
        barangay: String,
        municipality: String,
        province: String
    },
    docType: String,
    accessCode: String
}, {
    collection: "barangay_indigency"
});

let businessClearanceSchema = new Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        middleName: { type: String, required: false },
        suffix: { type: String, required: false }
    },
    businessType: String,
    dateStarted: String,
    address: {
        sitio: String,
        barangay: String,
        municipality: String,
        province: String
    },
    docType: String,
    accessCode: String
}, {
    collection: "business_clearance"
});

Staff.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const brgyClearance = mongoose.model("brgyClearance", brgyClearanceSchema);
const brgyIndigency = mongoose.model("brgyIndigency", brgyIndigencySchema);
const businessClearance = mongoose.model("businessClearance", businessClearanceSchema);
const Admins = mongoose.model("Admin", Admin);
const Staffs = mongoose.model("Staff", Staff);
const Codes = mongoose.model("Code", Code);
const Transactions = mongoose.model("Transaction", TransactionSchema);
module.exports = {
    Admins, Staffs, Codes, Transactions,
    brgyClearance, brgyIndigency, businessClearance
};