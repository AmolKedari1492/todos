var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var customerSchema = new Schema({
    customer_id: String,
    email: String,
    referral_id: String,
    payload: Number,
    isAmbassador: Boolean,
    joiningDate:Date,
    lastUpdated:Date
});

var Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;