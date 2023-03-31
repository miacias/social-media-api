const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    thoughtContent: {
        type: String,
        required: true,
        minlength: 4
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = thoughtSchema;