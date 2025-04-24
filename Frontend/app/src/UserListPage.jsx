import React , {useState,useEffect, use} from "react";
import axios from "axios";
import { Stack, Table } from "@chakra-ui/react"


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
    //     <div style={{ maxWidth: "500px", margin: "40px auto" }}>
    //   <h2>User List</h2>

    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : error ? (
    //     <p style={{ color: "red" }}>{error}</p>
    //   ) : (
    //     <ul>
    //       {users.map((user) => (
    //         <li key={user.id}>
    //           {user.name} ({user.email})
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    //   </div>
    <Stack gap={"20"}>
        <Table.Root size={"lg"} striped showColumnBorder>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Name</Table.ColumnHeader>
                    <Table.ColumnHeader>Email</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"center"}>Company</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"center"}>Age</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign={"center"}>Position</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {users.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell textAlign={"center"}>{user.company}</Table.Cell>
                        <Table.Cell textAlign={"center"}>{user.age}</Table.Cell>
                        <Table.Cell textAlign={"center"}>{user.position}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

        </Table.Root>

    </Stack>
    )
    
}

export default UserListPage;