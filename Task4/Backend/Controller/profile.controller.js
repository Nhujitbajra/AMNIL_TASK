const express = require("express");
const User = require("../Model/user.model");

const updateProfile = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    if (!name || !address || !phone) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const profileImage = req.file ? req.file.path : null;

    const newProfile = new Profile({
      name,
      address,
      phone,
      profileImage,
    });

    await newProfile.save();

    res.status(201).json({ message: "Profile updated successfully!", profile: newProfile });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { updateProfile };