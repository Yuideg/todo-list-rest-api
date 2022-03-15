var mongoose = require("mongoose");
var Users = mongoose.model("Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

exports.Login = (req, res) => {
    const { username, password } = req.body;
    console.log("username ", username, "password ", password);

    if (!(username && password)) {

        return res.status(400).send("Username or Password Required!");
    }
    Users.findOne({ username }).exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err
            });
            return;
        } else if (!user) {
            res.status(404).send({
                message: "User Not found."
            });
            return;
        };


        bcrypt.compare(password, user.password, function(err, result) {
            if (err == null && result) {
                const claims = {
                    user_id: user._id,
                    username: user.username,
                    role: user.role,

                }
                const token = jwt.sign(
                    claims,
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "1h",
                    }
                );

                return res.status(200).send({
                    user: {
                        user,
                    },
                    message: "Login successfull",
                    accessToken: token,
                });
            } else {
                res.status(404).send({
                    Error: "Incorrect username or password!"
                });
                return;

            }

        });

    });

};