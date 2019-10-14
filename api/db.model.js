const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Admin = new Schema({
    username: {
        type: String
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
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    position: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'staff'
})

/**
 * Need object model for transaction
 *  {
        name : name of user,
        request : type of document request by the user,
        officer : officer in charge(id of the officer(maybe)),
        date:date of transaction
    },
 */
const Admins = mongoose.model('Admin', Admin);
const Staffs = mongoose.model('Staff', Staff);
module.exports = { Admins, Staffs };