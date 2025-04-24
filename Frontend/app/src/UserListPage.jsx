import React , {useState,useEffect} from "react";
import axios from "axios";

export const url = "http://localhost:8000"

function UserListPage(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        setLoading(true)
        axios.get(`${url}/api/users/`)
        .then(result => {
            setUsers(result.data);
            setLoading(false)
        })
        .catch(error => {
            setError("Failed to fetch");
            setLoading(false)
            console.log(error)
        })
    }
    return (
        <div style={{ maxWidth: "500px", margin: "40px auto" }}>
      <h2>User List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
      </div>
    )
    
}

export default UserListPage;