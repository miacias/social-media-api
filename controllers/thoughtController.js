// MongoDB-Mongoose ObjectId() method: convert string to ObjectId
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            if (thoughts) {
                res.status(200).json(thoughts);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const oneThought = await Thought.find({_id: ObjectId(req.params.thoughtId)});
            if (oneThought) {
                return res.status(200).json(oneThought);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const newThought = new Thought({
                thoughtText: req.body.thoughtText,
                username: req.body.username
            });
            await newThought.save();
            const userThought = await User.findOneAndUpdate({
                username: req.body.username
            },
            {
                $addToSet: {
                    thoughts: newThought._id
                }
            });
            if (newThought && userThought) {
                return res.status(200).json(newThought);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err); 
        }
    },
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate({
                _id: ObjectId(req.params.thoughtId)
            },
            {
                thoughtText: req.body.thoughtText,
                username: req.body.username
            },
            {
                new: true
            });
            if (updatedThought) {
                return res.status(200).json(updatedThought);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err); 
        }
    },
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({_id: ObjectId(req.params.thoughtId)}, { rawResult: true });
            if (deletedThought) {
                return res.status(200).json(deletedThought);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err); 
        }
    },
    async createReaction(req, res) {
        try {
            const newReaction =  await Thought.findOneAndUpdate({
                _id: ObjectId(req.params.thoughtId)
            },
            {
                $addToSet: {
                    reactions: {
                        reactionBody: req.body.reactionBody,
                        username: req.body.username
                    }
                }
            });
            if (newReaction) {
                return res.status(200).json(newReaction);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async deleteReaction(req, res) {
        try {
            const deletedReaction = await Thought.findOneAndUpdate({
                _id: ObjectId(req.params.thoughtId)
            },
            {
                $pull: { reactions: req.params.reactionId}
            },
            {
                new: true
            });
            if (deletedReaction) {
                return res.status(200).json(deletedReaction);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
};