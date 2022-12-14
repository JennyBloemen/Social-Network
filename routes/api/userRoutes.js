const router = require("express").Router();
const {
  getAllUsers,
  getUserbyId,
  createUser,
  updateUser,
  removeUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get(getUserbyId).put(updateUser).delete(removeUser);

router.route("/:id/friends/:friendId").post(addFriend).delete(removeFriend);

router.route("/").get(getAllUsers).post(createUser);

module.exports = router;
