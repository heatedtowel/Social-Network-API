const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((video) =>
        !video
          ? res.status(404).json({ message: 'No video with that ID' })
          : res.json(video)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new video
  createThought(req, res) {
    Thought.create(req.body)
      .then((Newthought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: Newthought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Video created, but found no user with that ID',
            })
          : res.json('Created the video 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((video) =>
        !video
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(video)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((video) =>
        !video
          ? res.status(404).json({ message: 'No thought with this id!' })
          : User.findOneAndUpdate(
              { thought: req.params.thoughtId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Video created but no user with this id!' })
          : res.json({ message: 'Video successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};
