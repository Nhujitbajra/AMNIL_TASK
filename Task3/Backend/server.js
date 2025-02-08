const express = require("express");
require("dotenv").config();
const app = express();
const PORT = 3000;
const dbConnect = require("./db");
var cors = require('cors');  
const router = require("./Routes/auth");
const userRoutes = require("./Routes/user")

app.use(express.json());

app.use(cors()) //using cors



app.get("/msg", (req, res, next) => {
  res.json({ message: "Hello, World!" });
});



dbConnect()

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});
app.use("/api/users", require('./Routes/auth'));
app.use("/api/", userRoutes);


