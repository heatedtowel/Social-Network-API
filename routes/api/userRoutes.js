const router = require('express').Router();
const { getAllUsers , getOneUser , createUser, updateUser, removeUser } = require('../../controllers/userController');

router.route('/')
  .get(getAllUsers)
  .post(createUser);

router.route('/:userId')
  .get(getOneUser)
  .put(updateUser)
  .delete(removeUser);

module.exports = router;
