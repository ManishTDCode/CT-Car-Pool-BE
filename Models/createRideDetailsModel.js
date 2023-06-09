const mongoose = require('mongoose');

const createRideSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    ridetype: {
        type: String,
        required: true
    },
    vehiclenumber: {
        type: String,
        required: true
    },
    vehiclecolor: {
        type: String,
        required: true
    },
    vehicletype: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    excluded: {
        type: Boolean
    }


});

module.exports = mongoose.model('CreateRideDetails', createRideSchema) //name SingUpDetails can be anything