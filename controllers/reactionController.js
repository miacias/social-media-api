// MongoDB-Mongoose ObjectId() method: convert string to ObjectId
const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
    async getReactions(req, res) {
        try {
            const reactions = await Reaction.find({});
            if (reactions) {
                return res.status(200).json(reactions);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async getSingleReaction(req, res) {
        try {
            const oneReaction = await Reaction.findOne({_id: req.params.reactionId});
            if (oneReaction) {
                return res.status(200).json(oneReaction);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async createReaction(req, res) {
        try {
            const newReaction = new Reaction({
                reactionBody: req.body.reactionBody,
                username: req.body.username
            });
            await newReaction.save();
            if (newReaction) {
                return res.status(200).json(newReaction);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async updateReaction(req, res) {
        try {
            const updatedReaction = await Reaction.findOneAndUpdate({
                _id: ObjectId(req.params.reactionId)
            },
            {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            },
            {
                new: true
            });
            if (updatedReaction) {
                return res.status(200).json(updatedReaction);
            }
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}