const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtbyId,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller");

const { route } = require("./userRoutes");
router.route("/").get(getAllThoughts);

router.route("/:userId").post(addThought);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought);

router.route("/:thoughtId").get(getThoughtbyId).put(updateThought);

router.route("/:userId/:thoughtId").delete(removeThought);

router.route("/:thoughtId/reactions").post(addReaction);

router.route("/:thought/reactions/:reactionsId").delete(removeReaction);

module.exports = router;
