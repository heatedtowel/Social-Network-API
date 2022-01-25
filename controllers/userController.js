const User = require('../models/User');

module.exports = {
  getAllUsers(req, res) {
    User.find()
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.status(500).json(err));
  },
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) => !user ? res.status(404).json({ message: 'Cannot find User' }) : res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((newUserData) => res.json(newUserData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        runValidators: true,
        new: true
      }
    )
      .then((user) => !user ? res.status(404).json({ message: 'No video with this id!' }) : res.json(user))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  removeUser(req, res) {
    console.log(User.findOneAndRemove)
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res
            .status(404)
            .json({ message: 'No user with this id!' })
          : res.json({ message: 'User successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  }
}