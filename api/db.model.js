const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

// Define collection and schema for Post

let StaffSchema = new Schema({

    username: {
        type: String,
        unique: true, //NOTE TO THE FRONTEND: LOWECASE MUST BE REQUIRED UPON REGISTERING  //test
    },
    password: {
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
    position: String,
    barangay: String,
})

let Code = new Schema({
    id: String,
    type: String,
    name: String
})


StaffSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

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

const Staffs = mongoose.model('Staff', StaffSchema);
const Codes = mongoose.model('Codes', Code);;
module.exports = { Staffs, Codes };