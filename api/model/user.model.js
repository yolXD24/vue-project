const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let brgyClearanceSchema = new Schema({
    name: {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        middleName: {type:String, required:false},
        suffix: {type:String, required:false}
    },
    age: Number,
    sex: String,
    citizenship: String,
    civilStatus: String,
    address: {
        sitio:String,
        barangay:String,
        municipality:String,
        province:String
    },
    docType: String,
    accessCode: String
}, {
    collection: "barangay_clearance"
});

let brgyIndigencySchema = new Schema({
    name: {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        middleName: {type:String, required:false},
        suffix: {type:String, required:false}
    },
    age: Number,
    sex: String,
    address: {
        sitio:String,
        barangay:String,
        municipality:String,
        province:String
    },
    docType: String,
    accessCode: String
}, {
    collection: "barangay_indigency"
});

let businessClearanceSchema = new Schema({
    name: {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        middleName: {type:String, required:false},
        suffix: {type:String, required:false}
    },
    businessType: String,
    dateStarted: String,
    address: {
        sitio:String,
        barangay:String,
        municipality:String,
        province:String
    },
    docType: String,
    accessCode: String
}, {
    collection: "business_clearance"
});

const brgyClearance = mongoose.model("brgyClearance", brgyClearanceSchema);
const brgyIndigency = mongoose.model("brgyIndigency", brgyIndigencySchema);
const businessClearance = mongoose.model("businessClearance", businessClearanceSchema);
module.exports = { brgyClearance, brgyIndigency, businessClearance };