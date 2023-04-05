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
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// route for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').get(getSingleUser).post(addFriend).delete(removeFriend);

module.exports = router;