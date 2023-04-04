const { Schema, model } = require('mongoose');

// schema for User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            maxLength: 50,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            maxLength: 50,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought' // refers back to thoughts
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user' // refers back to itself
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

// calculates total friends list number
// acts as a virtual column but not stored directly in the schema
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// compiles a User model based on the schema
const User = model('user', userSchema);

module.exports = User;