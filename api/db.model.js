const mongoose = require('mongoose');
// var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define collection and schema for Post

let Staff = new Schema({
    account: {
        username: {
            type: String,
            unique: true, //NOTE TO THE FRONTEND: LOWECASE MUST BE REQUIRED UPON REGISTERING  //test
        },
        password: String
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
    position: String,
    barangay: String,
})

let Code = new Schema({
    id: String,
    type: String,
    name: String
})
const Staffs = mongoose.model('Staff', Staff);
const Codes = mongoose.model('Codes', Code);;
module.exports = { Staffs, Codes };