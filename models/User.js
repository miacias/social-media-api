const { Schema, Types, model } = require('mongoose');

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
                ref: 'user', // refers back to itself
                // strictPopulate: false
            }
        ]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false
    }
);

// calculates total friends list number
// acts as a virtual column but not stored directly in the schema
userSchema.virtual('friendCount').get(function () {
    if (userSchema.friends) {
        return this.friends.length;
    }
});

// compiles a User model based on the schema
const User = model('user', userSchema);

module.exports = User;