const express = require("express");
const { updateProfile } = require("../Controller/profile.controller");
const multer = require("multer");
const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post("/update-profile", upload.single("profileImage"), updateProfile);

module.exports = router;