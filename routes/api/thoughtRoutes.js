const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// route for /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// route for /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// route for /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    // .get();
    .post(createReaction);

// route for /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
    // .get()
    // .put()
    .delete(deleteReaction);

module.exports = router;