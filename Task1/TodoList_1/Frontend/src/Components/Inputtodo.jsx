
import React , {useState} from "react";

const Inputtodo = () => {
  const [description, setDescription] = useState("")

  const onSubmitForm = async (e)=>{
    e.preventDefault();
    try {
        const body = {description};
        const response = await fetch("http://localhost:3000/todos",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        });
        console.log(response)
        window.location = "/"
    } catch (err) {
        console.error(err.message)
        
    }
  }

  return (
    <div>
      <h1 className="text-center">TODO List</h1>
      <form className="d-flex mt-5 mx-5" onSubmit={onSubmitForm} >
        <input type="text" className="form-control" value={description} onChange={e=> setDescription(e.target.value)} />
        <button className="btn btn-success">Add</button>
      </form>
    </div>
  );
};

export default Inputtodo;
