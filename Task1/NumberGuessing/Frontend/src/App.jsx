import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [number, setNumber] = useState(1);
  const [randomValue, setRandomValue] = useState(null);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("")
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    setRandomValue(Math.floor(Math.random() * 20) + 1);
  }, []);

  const addNewNumber = () => {
    if (number < 1 || number > 20) {
      setMessage("Please enter a number between 1 and 20.");
      return;
    }

    axios
      .post("http://localhost:3000/api/random/checkNumber", { number: parseInt(number), randomValue: parseInt(randomValue) })
      .then((response) => {
        
        const { message , attempts } = response.data
        setResponse(message)
        setAttempt(attempts)
      })
      .catch((error) => {
        setMessage("Failed to add the number. Please try again.");
        console.error(error);
      });
  };

  return (
    <div>
      <p className="title">Random Value: {randomValue}</p>
      <p className="sub-title">Enter a number between 1-20:</p>
      <div className="input">
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(Number(e.target.value))}
        min="1"
        max="20"
      />
      <button onClick={addNewNumber}>Enter the number</button>
      </div>
      <div className="result">
      {message && <p>{message}</p>}
      <p>Input Number: {number}</p>
      <p>This is your: {attempt} attempt. </p>
      <p>Result: {response}</p>
      </div>
    </div>
  );
};

export default App;
