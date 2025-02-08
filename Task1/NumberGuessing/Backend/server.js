const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});

//checking the api
app.get("/msg", (req, res, next) => {
  res.json({ message: "Hello, World!" });
});


app.use("/api/random", require("./Routes/routes.js"))

