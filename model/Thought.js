const { Schema, model } = require("mongoose");
// create the Thought model using the ThoughtSchema

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      require: true,
      minLength: 1,
      maxLength: 80,
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
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// get total count of comments and replies on retrieval
ThoughtSchema.virtual("thoughtCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", ThoughtSchema);

// export the Thought model
module.exports = Thought;
