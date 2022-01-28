const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: "username is Required",
    trim: true,
  },

  email: {
    type: String,
    required: "Email is Required",
    trim: true,
    unique: true,
    match: [/.+@.+\..+/],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const User = model("User", UserSchema);

module.exports = User;