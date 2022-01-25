const router = require('express').Router();
const { createFriend , getAllUsers , getOneUser , createUser, updateUser, removeUser } = require('../../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(removeUser);

router.route('/:userId/friends/:friendId')
  .post(createFriend)

module.exports = router;
