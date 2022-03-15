var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var auth=require("./api/auth/auth");
require("./api/models/todoModel");
require("./api/models/userModel");
require("./api/models/roleModel");
require('dotenv').config();
//Environmental Variables
var port = process.env.PORT || 9090;

// Connect to MongoDB
const connectionString = "mongodb://root:password123@localhost:27017/streamhatchet?authSource=admin&replicaSet=replicaset&retryWrites=true"

        const options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          autoIndex: true,
          serverSelectionTimeoutMS: 30000,
          socketTimeoutMS: 75000,
          family: 4,
          keepAlive: true, 
          keepAliveInitialDelay: 300000,
        };
  mongoose.connect(
    'mongodb://mongo:27017/test',
    // mongo,
    options
  )
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


