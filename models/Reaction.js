const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createAt: {
      type: Date,
      transform: getCreatedAtDate,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
function getCreatedAtDate() {
  return `${new Date(this.createdAt).getMonth() + 1}/${new Date(
    this.createdAt
  ).getDate()}/${new Date(this.createdAt).getFullYear()}`;
}
module.exports = reactionSchema;
