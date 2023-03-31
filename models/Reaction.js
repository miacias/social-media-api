const { Schema, Types } = require('mongoose');

// schema only!
// not a document model, thus needs an ID
// reactions will be directly stored into Thoughts instead of its own model
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
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
        get: (timestamp) => { // need to change format of timestamp
            return new Date(timestamp);
        }
    },
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// exports schema since it is not a stand-alone model
module.exports = reactionSchema;