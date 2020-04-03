const mongoose = require("mongoose");

var newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  photourl: String,
  ip:String
});

module.exports = mongoose.model("News", newsSchema);
