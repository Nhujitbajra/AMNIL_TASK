const express = require("express");
const { registerUser, loginUser, forgetPassword } = require("../Controller/user.controller");
const { body } = require("express-validator");
const {validateLogin, validateRegistration} = require('../Helper/validator')
const router = express.Router();


router.post("/register", validateRegistration, registerUser);

// Login route
router.post("/login", validateLogin, loginUser);

router.post("/forget", forgetPassword)

module.exports = router;
