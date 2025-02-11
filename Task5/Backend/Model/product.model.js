const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    views: Number,
    reviews: Number,
    popularity: Number,
    price: Number,
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model("Product", productSchema);