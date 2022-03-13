
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoleSchema = new Schema({
  name: {type: String,required: "name is required",trim:true,maxlength:30,},
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}

});


module.exports = mongoose.model("Roles", RoleSchema);
