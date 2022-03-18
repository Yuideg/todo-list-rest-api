var mongoose = require("mongoose");
var Users = mongoose.model("Users");
var Roles = mongoose.model("Roles");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Login = async(req, res) => {
    const { username, password } = req.body;
    console.log("username ", username, "password ", password);

    if (!(username && password)) {

        return res.status(400).json({
            "result": " Username or Password Required!"
        });
    }
    const user = await Users.findOne({ username }).exec();
    if (!user) {
        return res.status(404).send({
            message: "User Not found."
        });

    };

    console.log("user ", user);
    const id = (user.role);
    const user_role = await Roles.findById({ _id: id }).exec();


    if (!user_role) {
        return res.status(404).send({
            message: "User Role Not found."
        });

    };
    console.log("user ", user.role.toString(), " role ", user_role.name);

    bcrypt.compare(password, user.password, function(err, result) {
        if (err == null && result) {

            const claims = {
                user_id: user._id,
                username: user.username,
                role: user_role.name,

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
};