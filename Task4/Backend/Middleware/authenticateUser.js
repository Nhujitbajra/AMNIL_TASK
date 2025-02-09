const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.SECRET;

const authenticateUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    const extractedToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    const data = jwt.verify(extractedToken, JWT_SECRET);
    req.user = data.user;
    next();

  } catch (error) {
    res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = authenticateUser;
