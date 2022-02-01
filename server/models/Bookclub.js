const eventSchema = require('./Event')
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const messageSchema = require('./Discussion')


const bookClubSchema = new Schema(
    {
        clubName: {
            type: String,
            unique: true
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },

        creator: {
            type: String,
            required: true
        },

        bookId: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },

        authors: {
            type: [String],
            required: true
        },

        imgUrl: {
            type: String
        },

        speed: {
            type: String,
            required: true
        },

        type: {
            type: String,
            required: true
        },

        meetingDay: {
            type: String,
            required: true
        },

        meetingTime: {
            type: String,
            required: true
        },

        events: [eventSchema],

        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        discussion: [messageSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

bookClubSchema.virtual('membersCount').get(function () {
    return this.members.length;
});


const BookClub = model('BookClub', bookClubSchema);

module.exports = BookClub;

