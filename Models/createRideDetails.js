const mongoose = require('mongoose');

const createRideSchema = new mongoose.Schema({
    ridetype: {
        type: String,
        required: true
    },
    vehiclenumber: {
        type: String,
        required: true,
        unique: true
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
    }

    
});

module.exports = mongoose.model('CreateRideDetails', createRideSchema) //name SingUpDetails can be anything