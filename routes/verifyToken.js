const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    console.log(authHeader);
    jwt.verify(authHeader, process.env.JWT, (err, user) => {
      console.log("Ok");
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not allowed to access this route");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to access this route");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth, verifyTokenAndAdmin };
