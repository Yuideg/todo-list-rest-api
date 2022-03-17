var mongoose = require("mongoose");
var Users = mongoose.model("Users");
const bcrypt = require("bcrypt");

exports.GetAllUser = (req, res) => {
    Users.find({}, (err, users) => {
            if (err) {
                return res.send(err);
            }
            return res.json(users);
        })
        .populate("role", "-_id -__v -created_at -updated_at")
        .select("-__v -created_at -updated_at");
};



exports.CreateUser = (req, res) => {
    var newUser = new Users(req.body);

    const username = newUser.username;
    Users.findOne({ username }).exec((err, user) => {
        console.log("user==>", user);
        if (err) {
            return res.send("User Not Found!");
        }
        if (user) {
            return res.status(409).send("User Already Exist!");
        }
        //Encrypt user password
        var pass = newUser.password.toString();
        var numOfRounds = 10;
        console.log(pass, numOfRounds);
        bcrypt.hash(pass, numOfRounds, function(err, hash) {
            console.log("error ", err, hash);
            if (err) {
                return res
                    .status(409)
                    .send({ Error: "Hashing password credential failed!" });
            }

            newUser.password = hash;
            console.log("User Creation started!");
            newUser.save((err, user) => {
                if (err) {
                    return res.send("User creation failed!");
                }
                return res.status(201).json(newUser);
            });
        });
    });
};

exports.GetUserByID = (req, res) => {
    Users.findById(req.params.id, (err, user) => {
            if (err) {
                return res.send(err);
            }
            return res.json(user);
        })
        .populate("role", "-_id -__v -created_at -updated_at")
        .select("-__v -created_at -updated_at");

};

exports.UpdateUser = (req, res) => {
    const filter = { _id: req.params.id, };
    Users.findOneAndUpdate(filter, req.body, { new: true },
        (err, user) => {
            if (err) {
                return res.send(err);
            }
            return res.json(user);
        }
    );
};

exports.DeleteUser = (req, res) => {
    Users.remove({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.send("User deletion operation failed!");
        }
        return res.json({ message: "User is deleted successfully" });
    });
};