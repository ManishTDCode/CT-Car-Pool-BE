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
        type: String,
        unique: true
    },
    vehicleNumber: {
        type: String,
        unique: true
    },
    vehicleColor: {
        type: String,
        unique: true
    },
    carType: {
        type: String,
        unique: true
    }

    
});

module.exports = mongoose.model('SingUpDetails', signupSchema) //name SingUpDetails can be anything