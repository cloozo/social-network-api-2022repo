const { Reaction, Thought } = require("../models");

const reactionController = {
  addReaction({ params, body }, res) {
    console.log(params);
    Reaction.create(body)
      .then(({ _id }) => {
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $push: { reactions: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  addReply({ params, body }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.reactionId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    Reaction.findOneAndDelete({ _id: params.reactionId })
      .then((deletedReaction) => {
        if (!deletedReaction) {
          return res.status(404).json({ message: "No reaction with this id!" });
        }
        return Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: params.reactionId } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Sorry No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
  removeReply({ params }, res) {
    Reaction.findOneAndUpdate(
      { _id: params.reactionId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};
//Exporting modules
module.exports = reactionController;
