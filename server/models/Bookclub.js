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
        discussion: [discussionSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

discussionSchema.virtual('discussionCount').get(function () {
    return this.discussion.length;
});

const BookClub = model('BookClub', bookClubSchema);

module.exports = BookClub;

