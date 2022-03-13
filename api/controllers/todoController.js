var mongoose = require("mongoose");
var Task = mongoose.model("Tasks");

exports.GetAllTask = (req, res) => {
  Task.find({}, (err, todo) => {
    if (err) {
      return res.send(err);
    }
    return res.json(todo);
  })
    .populate("user", "-_id -__v -created_at -updated_at")
    .select("-__v -created_at -updated_at");
};

exports.CreateTask = (req, res) => {
  var newTodo = new Task(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      return res.send(err);
    }
    return res.json(todo);
  });
};

exports.GetTaskByID = (req, res) => {
  Task.findById(req.params.id, (err, todo) => {
    if (err) {
      return res.send(err);
    }
    return res.json(todo);
  })
    .populate("user", "-_id -__v -created_at -updated_at")
    .select("-__v -created_at -updated_at");
};

exports.UpdateTask = (req, res) => {
  Task.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, todo) => {
    if (err) {
      return res.send(err);
    }
    return res.json(todo);
  });
};

exports.DeleteTask = (req, res) => {
  Task.remove({ _id: req.params.id }, (err, todo) => {
    if (err) {
      return res.send(err);
    }
    return res.json({ message: "Task is deleted successfully" });
  });
};
