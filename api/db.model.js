const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
        collection: 'admin'
    });

let Staff = new Schema({
    account: {
        username: {
            type: String,
            unique: true
        },
        password: String
    },
    name: {
        firstname: String,
        lastname: String
    },
    email: {
        type: String,
        unique: true
    },
    position: String,
    barangay: String,

})


const Admins = mongoose.model('Admin', Admin);
const Staffs = mongoose.model('Staff', Staff);
module.exports = { Admins, Staffs };