const { ObjectId } = require("mongodb");
var mongoose = require("mongoose");
var Role = mongoose.model("Roles");

exports.GetAllRole = (req, res) => {
    Role.find({}, (err, roles) => {
        if (err) {
            return res.send(err);
        }
        return res.json(roles);
    }).select("-__v -created_at -updated_at");
};

exports.CreateRole = (req, res) => {
    var newRole = new Role(req.body);
    newRole.save((err, role) => {
        if (err) {
            return res.send(err);
        }
        return res.json(role);
    });
};

exports.GetRoleByID = (req, res) => {
    Role.findById(req.params.id, (err, role) => {
        if (err) {
            return res.send(err);
        }
        return res.json(role);
    }).select("-__v -created_at -updated_at");

};

exports.UpdateRole = (req, res) => {
    Role.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, role) => {
        if (err) {
            return res.send(err);
        }
        return res.json(role);
    });
};

exports.DeleteRole = (req, res) => {
    Role.remove({ _id: req.params.id }, (err, role) => {
        if (err) {
            return res.send(err);
        }
        return res.json({ Error: "Role is deleted successfully" });
    });
};