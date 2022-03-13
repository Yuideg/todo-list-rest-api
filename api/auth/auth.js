
const jwt = require("jsonwebtoken");
const model=require("../config/model.conf");
const policy=require("../config/policy.csv");
const { newEnforcer } = require("casbin");

exports.Authoriser=(req, res, next)=> {
  // const enforcer = newEnforcer(model, policy);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token==>", token);
  
  if (token=="") {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, claims) => {
    console.log("token error ", err);
    if (err) {
      return res.sendStatus(403).send("No Auth!");
    }
    const sub = "alice"; // the user that wants to access a resource.
    const obj = "data1"; // the resource that is going to be accessed.
    const act = "read"; // the operation that the user performs on the resource.

    const res =  enforcer.enforce(sub, obj, act);
    if (res) {
      // permit alice to read data1
      console.log("Authorised User!");
      next();
      return;
    }else {
      // deny the request, show an error
      return res.status(403).json("UnAuthorized Request!");
    }
  });
}
