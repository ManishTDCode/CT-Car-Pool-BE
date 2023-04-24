const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
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
        type: String,
        required: true
    },
    vehicleNumber: {
        type: String,
        required: true
    },
    vehicleColor: {
        type: String,
        required: true
    },
    carType: {
        type: String,
        required: true
    }


});

module.exports = mongoose.model('SingUpDetails', signupSchema) //name SingUpDetails can be anything