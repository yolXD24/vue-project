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
    collection: 'Admins'
});
//THIS SCHEMA IS MADE ONLY FOR TESTING PURPOSES, IT IS NOT YET FINAL
let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
}, {
    collection: 'user'
})


const Admins = mongoose.model('Admin', Admin);
const Users = mongoose.model('User', User);
module.exports = { Admins, Users };