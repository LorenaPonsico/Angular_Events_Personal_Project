const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    creatorId: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    registeredParticipants: {
        type: [String] ,
        required: false
    }, 
    creationDate: {
        type: Date,
        default: Date.now()
    }

});


module.exports = mongoose.model('Event', EventSchema)