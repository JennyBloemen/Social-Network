const { Thought, User } = require("../models");

// get all thoughts
module.exports = {
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) =>
        !thoughts
          ? res.status(404).json({ message: "No thoughts found" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },

  // get single thought
  getThoughtbyId(req, res) {
    Thought.find({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // post to crate a new thought pushed to assocaiated user's thoughts
  addThought(req, res) {
    Thought.create(body)
      .then((thought) => {
        User.findOneAndUpdate(
          { username: req.body.username },
          {
            $push: {
              thoughts: thought._id,
            },
          },
          { runValidators: true, new: true }
        ).then(res.json(thought));
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  //put to update a thought by it's id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found" });
        } else {
          if (req.body.username) {
            User.findOneAndUpdate(
              { username: req.body.username },
              {
                $addToSet: {
                  thoughts: thought._id,
                },
              }
            ).then(res.json(thought));
          } else {
            res.json(thought);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  //delete to remove thought by it's id
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought found." });
        } else {
          User.findOneAndUpdate(
            { username: thought.username },
            {
              $pull: {
                thoughts: req.params.thoughtId,
              },
            }
          ).then(res.json(thought));
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  //post to create a reaction stored in single thoughts reaction array field
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: req.body,
        },
      },
      { runValidators: true, new: true }
    )
      .then((reaction) => res.json(reaction))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  //delete to pull ane remove a reactions by it's id
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $pull: {
          reactions: {
            reactionId: req.params.reactionId,
          },
        },
      },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Something went wrong!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};
