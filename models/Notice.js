const mongoose = require("mongoose");

var noticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  validity: Date,
  ip:String
});

module.exports = mongoose.model("Notice", noticeSchema);
