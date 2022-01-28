const { Schema, model } = require("mongoose");
// create the Pizza model using the PizzaSchema

const ThoughtSchema = new Schema({
  thoughtName: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  size: {
    type: String,
    default: "Large",
  },
  toppings: [],
});
const Thought = model("Pizza", ThoughtSchema);

// export the Pizza model
module.exports = Thought;
