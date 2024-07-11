require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, jwtSecret);

      if (!decoded) {
        return res.json({
          success: false,
          message: "User not found with this token",
        });
      }

      req.user = decoded;
      console.log(req.user);
      console.log("next");

      next();
    } catch (error) {
      return res.json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.json({
      success: 0,
      message: "No token provided, authorization denied",
    });
  }
};

const allowRoles = (...roles) => {
  return (req, res, next) => {
    console.log("type" + req.user.user.role);
    if (!roles.includes(req.user.user.role)) {
      //console.log("Not authorized to access this route");
      return res.json({
        success: 0,
        message: "You're not authorized",
      });
    }
    next();
  };
};

module.exports = { protect, allowRoles };
