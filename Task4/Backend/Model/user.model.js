const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {String},
  phone: {String},
  profileImage: {String},
  role: { type: String, enum: ["user", "admin"], default: "user" }, // Role field
});

module.exports = mongoose.model("User", userSchema);
