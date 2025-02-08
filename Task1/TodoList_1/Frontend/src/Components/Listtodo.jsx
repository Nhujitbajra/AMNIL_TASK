import React, { useEffect, useState } from "react";
import Edittodo from "./Edittodo";

const Listtodo = () => {

    const [ todos, setTodos] = useState([])

    const getTodos = async ()=>{
        try {
           const response =  await fetch("http://localhost:3000/todos")
           const jsonData = await response.json()
           console.log(jsonData)
           setTodos(jsonData)
            
        } catch (err) {
            console.error(err.message)
            
        }
    }

    const deleteTodo = async (id)=> {
        try {
          const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`,{
            method : "Delete"
          }) 
          console.log(deleteTodo) 
          window.location = "/";
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(()=>{
        getTodos();
    },[])
  return (
    <div className="container mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            
            </tr>
          </thead>
          <tbody>
              {todos.map((todo) =>(
                <tr key={todo.todo_id}>
                    <td>{todo.description}</td>
                    <td><Edittodo todo={todo} /></td>
                    <td><button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Listtodo;
