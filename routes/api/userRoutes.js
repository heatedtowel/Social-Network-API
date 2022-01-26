const router = require('express').Router();
const { deleteFriend, createFriend, getAllUsers, getOneUser, createUser, updateUser, removeUser } = require('../../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(removeUser);

router.route('/:userId/friends')
  .post(createFriend)

router.route('/:userId/friends/:friendId')
  .delete(deleteFriend)

module.exports = router;
