const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

// Define collection and schema for Post

let Staff = new Schema({
    account: {
        username: {
            type: String,
            unique: true, //NOTE TO THE FRONTEND: LOWECASE MUST BE REQUIRED UPON REGISTERING
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


const Staffs = mongoose.model('Staff', Staff);
module.exports = { Staffs };