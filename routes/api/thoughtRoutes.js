const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought, // bonus: remove associated Thoughts when deleted
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController.js');

// route for /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// route for /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// route for /api/thoughts/:thoughtId/reactions
// router.route('/:thoughtId/reactions').get();

router.route('/:thoughtId/reactions/:reactionId').post(createReaction).put().delete(deleteReaction);

module.exports = router;