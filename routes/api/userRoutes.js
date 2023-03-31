const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addThought,
    removeThought
} = require('../../controllers/userController');

// route for /api/users
router.route('/').get(getUsers).post(createUser);

// route for /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// route for /api/users/:userId/thoughts
router.route('/:userId/thoughts').post(addThought);

// route for /api/users/:userId/thoughts/:thoughtId
router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

module.exports = router;