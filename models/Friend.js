const { Schema, model } = require("mongoose");

const FriendSchema = new Schema({
  _id: {},
});
const Friend = model("Friend", FriendSchema);

module.exports = Friend;