const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought.js');

// schema for User model
const userSchema = new Schema(
    {
        first: {
            type: String,
            required: true,
            max_length: 50
        },
        last: {
            type: String,
            required: true,
            max_length: 50
        },
        email: {
            type: String,
            required: true,
            max_length: 50
        },
        thoughts: [thoughtSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const User = model('user', userSchema);

module.exports = User;