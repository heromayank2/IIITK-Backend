const mongoose = require("mongoose");

var facultySchema = new mongoose.Schema({
    name:String,
    role:String,
    department:String,
    phonenumber:String,
    gspl:String,
    mail:String,
    twitter:String,
    facebook:String,
    linkedin:String,
    photourl:String,
    description:String,
    research_intersts:Array,
    publications:Array
});

module.exports = mongoose.model("Faculty", facultySchema);