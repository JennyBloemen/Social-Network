const { Schema, model, SchemaTypes } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trimmed: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: { // Must match a valid email address (look into Mongoose's matching validation)
        validator: function (email){
            return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\    [\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(email);
            }
        }
    },
    // Array of _id values referencing the Thought model
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought"}],
    //Array of _id values referencing the User model (self-reference)
    friends: [{ type: Schema.Types.ObjectId, ref : "User"}],
  },
  {
    toJSON: {
    virtuals: true,
    },
    tooObject: {
    virtuals: true,
    },
    id: false
    }
);
userSchema.virtual('friendCount').get(funtion(){
    return this.friends.length;
});

const User = model("User", userSchema);
module.exports = User;
