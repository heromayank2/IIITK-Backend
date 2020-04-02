const mongoose = require("mongoose");

var facultySchema = new mongoose.Schema({
    name:String,
    role:String,
    department:String,
    phonenumber:String,
    mail:String,
    photourl:String,
    description:String,
    research_intersts:Array,
    selected_pubs:Array,
    ongoing_projects:Array
});

module.exports = mongoose.model("Faculty", facultySchema);