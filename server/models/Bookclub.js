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

        username: {
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

        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        discussions: [discussionSchema]
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

