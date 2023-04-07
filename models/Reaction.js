const { Schema, Types } = require('mongoose');

// schema only!
// not a document model, thus needs an ID
// reactions will be directly stored into Thoughts instead of its own model
const reactionSchema = new Schema({
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            const timestamp = new Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium"
            }).format(date);
            return timestamp;
        }
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
);

// exports schema since it is not a stand-alone model
module.exports = reactionSchema;