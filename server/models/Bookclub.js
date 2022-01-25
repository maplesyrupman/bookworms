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
        
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        readBooks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book'
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

const BookClub = model('BookClub', bookClubSchema);

module.exports = BookClub;

