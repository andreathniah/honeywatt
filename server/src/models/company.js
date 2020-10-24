const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// COMPANY foreign key model - PHISH
const CompanySchema = new Schema({
  name: { type: String, required: true }, // primary key -- honeywatt
  hostname: { type: String, required: true }, // hostname -- honeywatt.com
  whitelist: { type: [String] },
  malicious: [{ type: Schema.Types.ObjectId, ref: "phish" }],
});

module.exports = Company = mongoose.model("company", CompanySchema);
