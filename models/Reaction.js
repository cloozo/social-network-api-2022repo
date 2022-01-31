const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent reaction _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    replyBody: {
      type: String,
      required: true,
    },
    writtenBy: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const ReactionSchema = new Schema(
  {
    writtenBy: {
      type: String,
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

ReactionSchema.virtual("replyCount").get(function () {
  return this.replies.length;
});

const Reaction = model("Reaction", ReactionSchema);

module.exports = Reaction;
