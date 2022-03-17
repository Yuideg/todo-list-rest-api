const jwt = require("jsonwebtoken");
exports.GetClaims = (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    var claims;
    if (token != undefined) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                return null;
            }
            claims = decode;
        });
    }
    return claims;

};