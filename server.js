var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var auth = require("./api/auth/auth");
require("./api/models/todoModel");
require("./api/models/userModel");
require("./api/models/roleModel");
require('dotenv').config();
//Environmental Variables
var port = process.env.PORT || 9090;
// Connect to MongoDB
// const connectionString = "mongodb://127.0.0.1:27017/todo?directConnection=true&serverSelectionTimeoutMS=2000";
const connectionString = 'mongodb+srv://endeg:endeg2378@cluster0.nza7l.mongodb.net/todo?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true,
};
// 'mongodb://mongo:27017/mydb',

mongoose
    .connect(connectionString, options)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(auth.Authoriser);
var routes = require("./api/routes/Routes");
routes(app);
app.listen(port, () => {
    console.log(`localhost is running in http://localhost:${port}`);
});