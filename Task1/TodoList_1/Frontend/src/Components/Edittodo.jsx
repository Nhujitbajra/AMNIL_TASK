import React ,{useState} from "react";

const Edittodo = ({todo}) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description)
  


  const updateDescription = async (e)=>{
    e.preventDefault();
    try {
        const body = {description};
        const response = await fetch(`http://localhost:3000/todos/${todo.todo_id}`,{
            method: "PUT",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })

        console.log(response)
        window.location = "/"
    } catch (err) {
        console.error(err.message)
    }
  }
  // Functions to handle modal open/close
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div className="container mt-4">
      <button className="btn btn-primary" onClick={handleShow}>
        Edit
      </button>

     
      {show && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Todo</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                ></button>
              </div>
              <div className="modal-body">
                <input type="text" className="form-control" value={description} onChange={e=>setDescription(e.target.value)}/>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={e=>updateDescription(e)}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Edittodo;
