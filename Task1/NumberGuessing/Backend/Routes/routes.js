const express = require("express");
const app = express();

const cors = require("cors");
const router = express.Router();
app.use(cors());
app.use(express.json()); // Ensure JSON body parsing middleware is included

let enteredNumbers = [];
let attempts = 0;
const maxAttempts = 5;

router.get("/number", (req, res) => {
  res.json({ number: enteredNumbers });
});

router.post("/checkNumber", (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { number, randomValue } = req.body;


    // Validate input
    if (number === undefined || typeof number !== "number") {
      return res.status(400).json({ error: "A valid number is required" });
    }

    attempts += 1
    enteredNumbers.push(number);

    if(attempts > maxAttempts){
        resetGame();
        return res.status(200).json({message: "Game over, you have used your 5 attempts." , attempts: 0})
      
    }

    if (number === randomValue) {
      attempts=0
      return res.status(200).json({
        message:
          "Congratulations! You've guessed the secret number!",
        attempts,
      });
    } else if (number > randomValue) {
      return res.status(200).json({ message: "Too big!", attempts });
    } else {
      return res.status(200).json({ message: "Too small!", attempts });
    }

  
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

function resetGame() {
    enteredNumbers = [];
    attempts = 0;
  }

module.exports = router;
