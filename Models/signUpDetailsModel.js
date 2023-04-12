const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    rideType: {
        type: String
    },
    vehicleNumber: {
        type: String,
        unique: true
    },
    vehicleColor: {
        type: String
    },
    carType: {
        type: String
    }


});

module.exports = mongoose.model('SingUpDetails', signupSchema) //name SingUpDetails can be anything