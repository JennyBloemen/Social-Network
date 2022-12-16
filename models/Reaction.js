const { Schema, model, SchemaTypes } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionID: {
      type: schema.types.objectID,
      default: () => new Types.objectID(),
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
      default: Date.now, //find formating code
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
