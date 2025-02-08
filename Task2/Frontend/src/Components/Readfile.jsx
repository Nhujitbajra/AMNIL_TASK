import React, { useEffect, useState } from 'react'

const Readfile = () => {
    const [users, setUsers] = useState([])
    
    const getUsers = async ()=>{
        try {
            const response =  await fetch("http://localhost:3000/users")
            const jsonData = await response.json()
            console.log(jsonData)
            setUsers(jsonData)
             
         } catch (err) {
             console.error(err.message)
             
         }
    }


    useEffect(()=>{
        getUsers();
    })

  return (
    <div className="container mt-4">
        <p>Json data</p>
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
          
          </tr>
        </thead>
        <tbody>
            {users.map((user) =>(
              <tr>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>{user.city}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Readfile
