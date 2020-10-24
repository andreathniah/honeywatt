const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// PHISH foreign key model - USER
const PhishSchema = new Schema({
  href: { type: String }, // full URL
  hostname: { type: String }, // hostname only
  ip_address: { type: String }, // ip address only
  identified_date: { type: Date, default: Date.now },
  submitted_by: [{ type: String, ref: "user" }],
});

module.exports = Phish = mongoose.model("phish", PhishSchema);
