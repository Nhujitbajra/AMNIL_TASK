const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const dbConnect = require("./db");
const PORT = 5000;
const Product = require("./Model/product.model");

app.use(cors());
app.use(express.json());

dbConnect()

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});




// Add product endpoint
app.post('/api/products', async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Get products with pagination, sorting, and filtering
  app.get('/api/products', async (req, res) => {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', minPrice, maxPrice } = req.query;
    const filters = {};
  
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = parseFloat(minPrice);
      if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }
  
    try {
      const products = await Product.find(filters)
        .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
  
      const total = await Product.countDocuments(filters);
  
      res.json({
        products,
        total,
        page: parseInt(page),
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get categorized product lists
  app.get('/api/products/categorized', async (req, res) => {
    try {
      const mostViewed = await Product.find().sort({ views: -1 }).limit(5);
      const mostPopular = await Product.find().sort({ popularity: -1 }).limit(5);
      const mostReviewed = await Product.find().sort({ reviews: -1 }).limit(5);
  
      res.json({ mostViewed, mostPopular, mostReviewed });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  