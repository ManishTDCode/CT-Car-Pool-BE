const mongoose = require('mongoose');

const requestRideSchema = new mongoose.Schema({
    requestedTo: {
        type: String,
        required: true
    },
    requestedFrom: {
        type: String,
        required: true
    },
    requestedFromfrom: {
        type: String,
        required: true
    },
    requestedFromto: {
        type: String,
        required: true
    },
    requestedFromTime: {
        type: String,
        required: true
    },
    isAccepted: {
        type: Boolean
    }


});

module.exports = mongoose.model('RequestRideDetails', requestRideSchema) //name SingUpDetails can be anything