const { Schema } = require('mongoose')
const dateFormat = require('../utils/dateFormat');

const discussionSchema = new Schema(
    {
        discussionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = discussionSchema;
