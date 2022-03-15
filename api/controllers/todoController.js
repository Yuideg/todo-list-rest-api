var mongoose = require("mongoose");
var Task = mongoose.model("Tasks");
const { GetClaims } = require("../util/util");


exports.GetAllTaskPerUSer = (req, res) => {
    Task.find({
            user: req.params.user_id
        }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        })
        // .populate("user", "-_id -__v -created_at -updated_at")
        .select("-__v -created_at -updated_at");
};
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
    var claims = GetClaims(req, res);

    Task.findOneAndUpdate({
        _id: req.params.id,
        user: claims.user_id
    }, req.body, { new: true }, (err, todo) => {
        if (err) {
            return res.send(err);
        }
        return res.json(todo);
    });
};

exports.DeleteTask = (req, res) => {
    var claims = GetClaims(req, res);
    Task.remove({
        _id: req.params.id,
        user: claims.user_id
    }, (err, todo) => {
        if (err) {
            return res.send(err);
        }
        return res.json({ message: "Task is deleted successfully" });
    });
};

// get All tasks for a specific user
exports.GetAllUserTasks = (req, res) => {
    var claims = GetClaims(req, res);
    Task.find({ user: claims.user_id }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        })
        .populate("user", "-_id -__v -created_at -updated_at")
        .select("-__v -created_at -updated_at");
};