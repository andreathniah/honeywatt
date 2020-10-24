const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// USER foreign key model - PHISH
const UserSchema = new Schema({
  parent: { type: String, ref: "company" },
  email: { type: String, required: true },
  phish: [{ type: Schema.Types.ObjectId, ref: "phish" }],
});

module.exports = User = mongoose.model("user", UserSchema);
