const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema(
    {
        eventName: {
            type: String,
            required: true
        },
        
        eventDate: {
            type: Date,
            required: true
        },

        location: {
            type: String,
            required: true
        },

        link: {
            type: String
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Event = model('Event', eventSchema);

module.exports = Event;

