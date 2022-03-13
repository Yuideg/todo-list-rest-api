var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: {
    type: String,
    required: "name is required",
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: "description is required",
    trim: true,
    maxlength: 400,
  },
  status: {
    type: [{ type: String, enum: ["pending", "doing", "done"] }],
    default: ["pending"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tasks", TaskSchema);
