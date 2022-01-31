const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLengh: 128,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    userName: { String, type: String, require: true },
    createdBy: {
      type: String,
      required: true,
      trim: true,
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
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of reactions and replies on retrieval
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.reduce(
    (total, reaction) => total + reaction.replies.length + 1,
    0
  );
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
