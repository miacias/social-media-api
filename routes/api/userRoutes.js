const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js');

// route for /api/users
router.route('/')
    .get(getUsers) // gets all users
    .post(createUser); // adds new user

// route for /api/users/:userId
router.route('/:userId')
    .get(getSingleUser) // gets user
    .put(updateUser) // updates user
    .delete(deleteUser); // removes user

// route for /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .get(getSingleUser) // gets friend
    .post(addFriend) // adds new friend
    .delete(removeFriend); // removes friend

module.exports = router;