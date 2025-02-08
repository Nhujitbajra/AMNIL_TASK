const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const path = require("path");

app.use(cors());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});

const fs = require("fs");

const jsonFilePath = path.join(__dirname, "Files", "user.json");

//basic function for read and write
const readData = () => {
  const data = fs.readFileSync(jsonFilePath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf8");
};

//get data or read
app.get("/users", (req, res) => {
  const data = readData();
  res.json(data);
});

//create
app.post("/users", (req, res) => {
  const data = readData();
  const newItem = {
    id: data.length + 1,
    ...req.body,
  };
  data.push(newItem);
  writeData(data);
  res.status(201).json(newItem);
});

// Update
app.put("/users/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  data[index] = { ...data[index], ...req.body };
  writeData(data);
  res.json(data[index]);
});

//delete
app.delete("/users/:id", (req, res) => {
  const data = readData();
  const index = data.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Item not found" });
  }
  const deletedItem = data.splice(index, 1);
  writeData(data);
  res.json(deletedItem);
});





//for cart
const cartFilePath =  path.join(__dirname, "Files", "carts.json");

const readCartData = () => {
  const data = fs.readFileSync(cartFilePath, "utf8");
  return JSON.parse(data);
};

const writeCartData = (data) => {
  fs.writeFileSync(cartFilePath, JSON.stringify(data, null, 2), "utf8");
};

app.post("/cart", (req, res) => {
  const data = readCartData();
  const newItem = {
    id: data.length + 100,
    ...req.body,
  };
  data.push(newItem);
  writeCartData(data);
  res.status(201).json(newItem);
});


app.get("/cart", (req, res) => {
  const data = readCartData();
  res.json(data);
});




//for order
const orderFilePath =  path.join(__dirname, "Files", "order.json");
const writeOrderData = (data) => {
  fs.writeFileSync(orderFilePath, JSON.stringify(data, null, 2), "utf8");
};

const readOrderData = () => {
  const data = fs.readFileSync(orderFilePath, "utf8");
  return JSON.parse(data);
}

app.post("/checkout", (req,res)=>{
  const cart = readCartData()
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);


  if (totalPrice < 1000000) {
    return res.status(400).json({
      message: "Total price is less than the minimum threshold i.e. 50",
    });
  }
  

  const data = readOrderData();
  const newOrder = {
    id: Date.now(),
    product: cart,
    total: totalPrice,
  };
  data.push(newOrder);
  writeOrderData(data);
  res.status(201).json(newOrder);

  res.status(200).json({
    message: "Order placed successfully",
    data: newOrder,
  });
})



























// // Read the JSON file
// fs.readFile( jsonFilePath, 'utf8', (err, data) => {
//   if (err) {
//     console.error('Error reading the file:', err);
//     return;
//   }

//   // Parse the JSON data
//   try {
//     const jsonData = JSON.parse(data);
//     console.log(jsonData); // Output the JSON data

//     // Access specific data
//     console.log('Name:', jsonData.name);
//     console.log('Age:', jsonData.age);
//     console.log('City:', jsonData.city);
//   } catch (parseError) {
//     console.error('Error parsing JSON:', parseError);
//   }
// });

//read file
// app.get("/user", (req, res)=>{
//   fs.readFile(jsonFilePath, "utf8", (err, data) => {
//     if (err) {
//       console.error("Error reading the file:", err);
//       return res.status(500).json({ error: "Failed to read JSON file" });
//     }

//     // Parse the JSON data
//     try {
//       const jsonData = JSON.parse(data);
//       res.json(jsonData); // Send the JSON data as the response
//     } catch (parseError) {
//       console.error("Error parsing JSON:", parseError);
//       res.status(500).json({ error: "Failed to parse JSON data" });
//     }
//   });
// })
