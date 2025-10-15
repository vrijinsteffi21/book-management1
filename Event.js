const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  location: String,
  type: String,
});

module.exports = mongoose.model("Event", eventSchema);
