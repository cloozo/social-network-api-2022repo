const { Friend, User } = require("../models");

const FriendRoutes = {
  //get all Friends
  getAllFriends(req, res) {
    Friend.find({})
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbFriendData) => res.json(dbFriendData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //get one Friend by ID
  getFriendById({ params }, res) {
    Friend.findOne({ _id: params.id })
      .populate({
        path: "user",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbFriendData) => res.json(dbFriendData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  //create Friend
  createFriend({ params, body }, res) {
    Friend.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { Friends: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "No user found with this username!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  //add reaction
  addReaction({ params, body }, res) {
    Friend.findOneAndUpdate(
      { _id: params.FriendId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbFriendData) => {
        if (!dbFriendData) {
          res.status(404).json({ message: "No Friend with this ID!" });
          return;
        }
        res.json(dbFriendData);
      })
      .catch((err) => res.json(err));
  },

  //delete Reaction
  removeReaction({ params }, res) {
    Friend.findOneAndUpdate(
      { _id: params.FriendId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbFriendData) => res.json(dbFriendData))
      .catch((err) => res.json(err));
  },

  //update a Friend by Id
  updateFriend({ params, body }, res) {
    Friend.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedFriend) => {
        if (!updatedFriend) {
          return res.status(404).json({ message: "No Friend with this ID!" });
        }
        res.json(updatedFriend);
      })
      .catch((err) => res.json(err));
  },

  //delete a Friend by ID
  deleteFriend({ params, body }, res) {
    Friend.findOneAndDelete({ _id: params.id })
      .then((deletedFriend) => {
        if (!deletedFriend) {
          return res.status(404).json({ message: "No Friend with this ID!" });
        }
        res.json(deletedFriend);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = router;
