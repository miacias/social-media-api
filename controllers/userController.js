// MongoDB-Mongoose ObjectId() method: convert string to ObjectId
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
                .populate({ path: 'friends', select: '-__v' });
            if (users) {
                return res.status(200).json(users);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const oneUser = await User.findOne({ _id: ObjectId(req.params.userId)})
                .populate({ path: 'friends', select: 'username email' }); // select filters out provided fields
            const oneFriend = await User.findOne({
                _id: ObjectId(req.params.friendId)
            });
            if (oneFriend || oneUser) {
                return res.status(200).json(oneFriend || oneUser);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const newUser = new User(
                {
                    username: req.body.username,
                    email: req.body.email
                });
            await newUser.save();
            if (newUser) {
                res.status(200).json(newUser);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err, { message: 'Unable to create new user. Please try again.' });
        }
    },
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate({
                _id: ObjectId(req.params.userId)
            },
            {
                username: req.body.username,
                email: req.body.email
            },
            {
                new: true
            });
            if (updatedUser) {
                return res.status(200).json(updatedUser);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            // deletes a user
            const deletedUser = await User.findOneAndDelete({ _id: ObjectId(req.params.userId) }, { rawResult: true });
            // deletes the associated user's thoughts
            const deletedUsername = deletedUser.value.username;
            const deletedThoughtsByUser = await Thought.deleteMany({username: deletedUsername}, { rawResult: true });
            if (deletedUser && deletedThoughtsByUser) {
                return res.status(200).json({message: "User and associated thoughts deleted!"});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const addedFriend = await User.findOneAndUpdate({
                _id: ObjectId(req.params.userId)
            },
            {
                $addToSet: { friends: ObjectId(req.params.friendId)}
            },
            {
                new: true
            });
            if (addedFriend) {
                return res.status(200).json(addedFriend);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const deletedFriend = await User.findOneAndUpdate({
                _id: ObjectId(req.params.userId)
            },
            {
                $pull: { friends: ObjectId(req.params.friendId)}
            },
            {
                new: true
            });
            if (deletedFriend) {
                return res.status(200).json(deletedFriend);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};