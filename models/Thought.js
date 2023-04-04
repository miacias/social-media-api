const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
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
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

// calculates total reactions list number
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// compiles a Thought model based on the schema
const Thought = model('thought', thoughtSchema);

module.exports = Thought;