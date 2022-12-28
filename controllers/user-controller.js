const { User, Thought } = require("../models");

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // get a single user by id
  getUserbyId(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("thoughts")
      .populate("friends")
      .select("-__V")
      .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(400).json(err);
        });
    },
 
  // post a new user
  createUser(req, res) {
    User.create(req.body)
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
  },
  
  // put to update user by id
    updateUser(req,res) {
        User.findOneAndUpdate(_
        { _id: req.params.UserId },
        { $set: req.body },
        { runValidators: true, new: true })
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with that id.'});
        return;
        }
        res.json(dbUserData)
      })
      .catch((err) => res.status(400).json(err));
},
  // delete to remove user by id
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.UserId })
            .then((dbUserData) => {
                if(!dbUserData){
                    return res
                      .status(404)
                      .json({ message: "No user found with this id!" });
                  }
            })
    },
  // post to add a new friend
  addFriend(req,res) {
    User.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
    )
    .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  
  // delete to remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true }
      )
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id!" });
            return;
          }
          res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    }
};
module.exports=userController;