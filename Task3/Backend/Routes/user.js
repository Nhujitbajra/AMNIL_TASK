const express = require("express");
const router = express.Router();
const authenticateUser  = require("../Middleware/authenticateUser");
const authorizeRole = require("../Middleware/authorizeRole");

// router.get("/admin-dashboard", authenticateUser, authorizeRole("admin"), (req, res) => {
//   res.json({ message: "Welcome to the Admin Dashboard!" });
// });

// router.get("/user-dashboard", authenticateUser, authorizeRole("user"), (req, res) => {
//   res.json({ message: "Welcome to the User Dashboard!" });
// });


router.get("/admin-dashboard", authenticateUser, authorizeRole("admin"),   (req, res) => {
    res.json({ message: "Welcome to the Admin Dashboard!" });
  });
  
  router.get("/user-dashboard", authenticateUser,  authorizeRole("user"),  (req, res) => {
    res.json({ message: "Welcome to the User Dashboard!" });
  });

module.exports = router;
