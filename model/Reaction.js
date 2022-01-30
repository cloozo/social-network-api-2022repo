const { Schema, model } = require("mongoose");

const ReactionSchema = new Schema({
  //   reactionId:
  username: {
    type: String,
    required: false,
  },
  writtenBy: {
    type: String,
  },
  reactionBody: {
    type: String,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reaction = model("Reaction", ReactionSchema);

module.exports = Reaction;
