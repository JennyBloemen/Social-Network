const { Schema, model, SchemaTypes } = require("mongoose");

const thoughtSchema = new Schema(
    {
    thoughtText: {
      type: String,
      required: true,
      min:  1,
      max: 280,
    },








thoughtSchema.virtual('reactionCount').get(funtion(){
      return this.reactions.length;
});