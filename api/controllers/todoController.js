var mongoose = require("mongoose");
var Task = mongoose.model("Tasks");
const { GetClaims } = require("../util/util");


exports.GetAllTaskPerUSer = (req, res) => {
    const filter = { user: req.params.user_id };
    Task.find(filter, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        })
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
    var claims = GetClaims(req, res);
    // console.log("user_id from claims ", claims);
    if (claims === null) {
        return res.status(400).json({
            "message": "User has no valid token credentials!"
        });
    }

    var newTodo = new Task(req.body);
    newTodo.user = claims.user_id;
    newTodo.save((err, todo) => {
        if (err) {
            return res.send(err);
        }
        return res.json(todo);
    });
};



exports.GetTaskByID = (req, res) => {
    const filter = { _id: req.params.id, };
    Task.findById(filter, (err, todo) => {
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
    const filter = { _id: req.params.id, user: claims.user_id };
    Task.findOneAndUpdate(
        filter, req.body, { new: true }, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        });
};

exports.DeleteTask = (req, res) => {
    var claims = GetClaims(req, res);
    const filter = { _id: req.params.id, user: claims.user_id };
    Task.remove(filter, (err, todo) => {
        if (err) {
            return res.send(err);
        }
        return res.json({ message: "Task is deleted successfully" });
    });
};

// GetAllUserTasks for a specific user
exports.GetAllUserTasks = (req, res) => {
    var claims = GetClaims(req, res);
    const filter = { user: claims.user_id };

    Task.find(filter, (err, todo) => {
            if (err) {
                return res.send(err);
            }
            return res.json(todo);
        })
        .populate("user", "-_id -__v -created_at -updated_at")
        .select("-__v -created_at -updated_at");
};