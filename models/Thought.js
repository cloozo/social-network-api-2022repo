const { Schema, model } = require("mongoose");

const ThoughtSchema = new Schema({
  _id: {},
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
