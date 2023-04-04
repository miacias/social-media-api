// MongoDB-Mongoose ObjectId() method: convert string to ObjectId
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

// aggregate function: gets total number of users
// const totalUsers = async () =>
//     User.aggregate()

// aggregate function: gets total number of user thoughts

// get, post, put, delete users

// get, post, put, delete thoughts

// post, delete user from friend list

module.exports = {
    async getUsers(req, res) {
        console.log('get users controller')
        try {
            const users = await User.find();
            if (users) {
                res.status(200).json(users);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // getUsers(req, res) {
    //     User.find()
    //       .then((users) => res.json(users))
    //       .catch((err) => res.status(500).json(err));
    //   },
    getSingleUser(req, res) {
        User.findOne({_id: ObjectId(req.params.id)}, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                console.log('error:', err);
                res.status(500).json(err);
            }
        });
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
            res.status(500).json(err, {message: 'Unable to create new user. Please try again.'});
        }
    },
    updateUser(req, res) {

    },
    deleteUser(req, res) {
        
    },
    addFriend(req, res) {
        
    },
    removeFriend(req, res) {
        
    }
};