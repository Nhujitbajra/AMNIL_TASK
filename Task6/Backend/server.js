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



//redis implementation
const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => console.error("Redis error", err));

const getProducts = async (req, res) => {
  try {
    const cachedProducts = await client.get("products");

    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find(); // Fetch from DB
    await client.setEx("products", 600, JSON.stringify(products)); // Cache for 10 min

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};


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
  

  // for Cursor-Based Pagination (Efficient for Large Datasets)
  app.get('/api/products', async (req, res) => {
    try {
      const { limit = 10, lastId } = req.query;
      const query = {};
  
      if (lastId) {
        query._id = { $gt: lastId }; // Fetch records after this ID
      }
  
      const products = await Product.find(query)
        .sort({ _id: 1 }) // Sort by ID to maintain correct order
        .limit(parseInt(limit));
  
      res.json({
        products,
        lastId: products.length > 0 ? products[products.length - 1]._id : null,
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
  