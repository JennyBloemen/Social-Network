const { Thought } = require("../model/Thought");
const { findOneAndUpdate } = require("../models/User");
const User = require("../models/User");

// get all thoughts
const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // get single thought
  getThoughtbyId(req, res) {
    Thought.findOne({ _id: req.params.thouhtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  // post to crate a new thought pushed to assocaiated user's thoughts
  addThought(req, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  //put to update a thought by it's id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { thoughts: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //delete to remove thought by it's id
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params, thoughtId })
      .then((deteltedThought) => {
        if (!deteltedThought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id." });
        }
        return User.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { thoughts: params.thoughtId } },
          { runValidators: true, new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //post to create a reaction stored in single thoughts reaction array field
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then(({ dbThoughtData }) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "No thought found with this id." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  //delete to pull ane remove a reactions by it's id
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};
