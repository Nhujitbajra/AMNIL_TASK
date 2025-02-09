const { body, validationResult } = require("express-validator");

// Validation rules for registration
const validateRegistration = [
  body("username", "Username must be at least 3 characters long").isLength({ min: 3 }),
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
];

// Validation rules for login
const validateLogin = [
  body("email", "Enter a valid email").isEmail(),
  body("password", "Password cannot be blank").exists(),
];


module.exports = {validateLogin, validateRegistration}