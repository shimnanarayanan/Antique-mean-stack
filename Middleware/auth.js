const { json } = require("express");
var jwt = require("jsonwebtoken");
const User = require("../Database/Models/User");

const auth = async (req, res, next) => {
  try {
    const authHeaders = req.headers["authorization"];
    const guestToken = "antique";
    if (authHeaders == guestToken) {
      req.auth = { USER_TYPE: "guest" };
      return next();
    }
    const token = authHeaders && authHeaders.split(" ")[1];

    if (!token) return res.sendStatus(401);
    var privateKey = process.env.ACCESS_TOKEN_SECRET;
    jwt.verify(token, privateKey, async function (err, decoded) {
      if (err) return res.sendStatus(403);

      const user = await User.findOne({
        _id: decoded.USER_ID,
      });
      if (!user) {
        return res.status(401).json({
          message: "Authorization failed. Please authenticate.",
        });
      }

      req.auth = decoded;
      next();
    });
  } catch (error) {
    return res.status(401).json({
      message: "Authorization failed. Please authenticate.",
    });
  }
};
module.exports = auth;
