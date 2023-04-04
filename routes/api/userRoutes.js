const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser, // bonus: remove associated Thoughts when deleted
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

// route for /api/users
router.route('/').get(getUsers).post(createUser);

// route for /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// route for /api/users/:userId/thoughts
// router.route('/:userId/thoughts').post(addThought);

// route for /api/users/:userId/thoughts/:thoughtId
// router.route('/:userId/thoughts/:thoughtId').delete(removeThought);

// BONUS
// route for /api/users/:userId/friends/:friendId
// router.route('/:userId').get(getSingleUser).post(createUser).delete(deleteUser);

module.exports = router;