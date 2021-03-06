const { newEnforcer } = require("casbin");
const { GetClaims } = require("../util/util");
exports.Authoriser = async(req, res, next) => {
    const e = await newEnforcer("api/config/model.conf", "api/config/policy.csv");
    let roles = ["anonymous"];
    var claims = GetClaims(req, res);
    console.log("claims =>", claims);
    if ((!claims) && (req.path != '/api/v1/auth/login')) {
        return res.status(403).json({ result: "Invalid Token Found!" });
    }
    console.log("user claims ", claims);

    if (claims != undefined && claims.role != "") {
        roles.push(claims.role);
    }
    const obj = req.path;
    const act = req.method;
    var rs = false;
    for (const i in roles) {
        sub = roles[i];
        console.log(sub, obj, act);
        rs = await e.enforce(sub, obj, act);
        if (rs) {
            break;
        }
        continue;
    }
    if (rs) {
        // permit user to the resource in his URL
        next();
    } else {
        // deny the request, show an error
        return res.status(403).json({
            Error: "No Valid Permission Found!",
        });
    }
};