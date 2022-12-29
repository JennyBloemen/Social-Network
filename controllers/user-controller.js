const { User, Thought } = require("../models");

module.exports = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((users) =>
        !users
          ? res.status(404).json({ message: "No users found." })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // get a single user by id
  getUserbyId(req, res) {
    User.find({ _id: req.params.userid })
      .populate("thoughts")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found." })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },

  // post a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // put to update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found." })
          : res.json(user)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
  // delete to remove user by id
  removeUser(req, res) {
    User.findOneAndDelete({ _id: req.params.UserId }).then((dbUserData) => {
      if (!dbUserData) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
    });
  },
  // post to add a new friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: params.userid },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found" })
          : res.json(user)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },

  // delete to remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: params.userid },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found" })
          : res.json(user)
      )
      .catch((err) => {
        console.error(err);
        res.status(500).json(err);
      });
  },
};
