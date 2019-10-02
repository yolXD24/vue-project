const express = require('express');
const postRoutes = express.Router();

// Require Post model in our routes module
let Admin = require('./db.model');

// Defined get data(index or listing) route
postRoutes.route('/').get(function(req, res) {
    Post.find(function(err, posts) {
        if (err) {
            res.json(err);
        } else {
            res.json(posts);
        }
    });
});

module.exports = postRoutes;