const express = require("express");
const User = require("../Model/user.model");
const router = express.Router();
const bcrypt = require("bcryptjs"); // Use bcryptjs instead of bcrypt
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { validateLogin, validateRegistration } = require("../Helper/validator");

const JWT_SECRET = process.env.SECRET;
const JWT_EXPIRY = "1h"; // Token expiry time
const myemail = process.env.EMAIL;
const mypassword = process.env.PASSWORD;
const receiverEmail = process.env.RECEIVER;
const { body, validationResult } = require("express-validator");

// Register User
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);

    // Create user
    user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: securePass,
      role: req.body.role,
    });

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Send response
    res.status(201).json({ user, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};

// Login User
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials." });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Send response
    res.json({ user, authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
};


const nodemailer = require("nodemailer");

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "User does not exist" });
    }

    // Generate a token for password reset
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

    // Configure the email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: myemail,
        pass: mypassword,
      },
    });

    // Set email options
    const mailOptions = {
      from: myemail,
      to: email, // Dynamic receiver email
      subject: "Password Reset Request",
      text: `Hello, here is your password reset token: ${token}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error while sending email:", error);
        return res.status(500).json({ status: "Email not sent" });
      }
      res.status(200).json({ status: "Email sent", info: info.response });
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Internal server error" });
  }
};

module.exports = { loginUser, registerUser, forgetPassword };
