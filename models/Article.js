const mongoose = require("mongoose");

var articleSchema = new mongoose.Schema({
  title: String,
  imageurl1: String,
  imageurl2: String,
  paragraph1: String,
  paragraph2: String,
  paragraph3: String,
  paragraph4: String,
  author: String
});

module.exports = mongoose.model("Article", articleSchema);
