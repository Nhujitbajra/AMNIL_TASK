const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const pool = require("./Model/db");

app.use(cors());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`);
});

//ROUTES//

//CREATE A TABLE

app.post("/todos", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(201).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("todo was updated");
  } catch (err) {
    console.error(err.messsage);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

//search a todo
app.post("/search", async (req, res) => {
  try {
    const { search } = req.body;
    const searchQuery = await pool.query(
      "SELECT * FROM todo WHERE description ILIKE $1",
      [`%${search}%`]
    );
    res.json(searchQuery.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
