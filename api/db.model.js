const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// Define collection and schema for Post

let StaffSchema = new Schema({

    username: {
        type: String,
        unique: true, //NOTE TO THE FRONTEND: LOWECASE MUST BE REQUIRED UPON REGISTERING  //test
    },
    password: {
        type: String
    }
}, {
    collection: 'staff'
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
        required: true
    },

    name: {
        firstname: String,
        lastname: String
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    admin: {
        type: Boolean
    },
    password: {
        type: String
    }
}, {
    collection: 'staff'
})

let Code = new Schema({
    _id: String,
    type: String
},{
    collection: 'codes'
})
/**
 * Need object model for transaction
 *  {
        name : name of user,
        request : type of document request by the user,
        officer : officer in charge(id of the officer(maybe)),
        date:date of transaction
    },

    {

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

StaffSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

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

Staff.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

const Admins = mongoose.model('Admin', Admin);
const Staffs = mongoose.model('Staff', Staff);
const Codes = mongoose.model('Code', Code);
module.exports = { Admins, Staffs, Codes };

