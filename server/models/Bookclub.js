const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const discussionSchema = require('./Discussion')

const bookClubSchema = new Schema(
    {
        bookClubName: {
            type: String,
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },

        createdByUsername: {
            type: String,
            required: true
        },

        createdById: {
            type: Schema.Types.ObjectId,
            required: true
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

        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        discussion: [discussionSchema]
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

