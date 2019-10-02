const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Admin = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  }
},{
    collection: 'admin'
});

module.exports = mongoose.model('Admin', Admin);