const { Schema, model } = require("mongoose");
// create the Pizza model using the ThoughtSchema

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    require: true,
    minLength: 1,
    maxLength: 20,
  },

  reactions: {
    type: String,
    require: true,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    require: true,
  },
});
const Thought = model("Thought", ThoughtSchema);

// export the Thought model
module.exports = Thought;
