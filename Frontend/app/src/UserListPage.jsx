import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Table, Input, Box , Text} from "@chakra-ui/react";
import { Button } from "./recipes/button";


export const url = "http://localhost:5555";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyFilter, setCompanyFilter] = useState(""); 
  const [positionFilter, setPositionFilter] = useState(""); 
  const [editingUserId, setEditingUserId] = useState(null);


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`${url}/api/users/`)
      .then((result) => {
        setUsers(result.data);
        setFilteredUsers(result.data); // Initialize filtered users with all users
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch");
        setLoading(false);
        console.log(error);
      });
  };



  // Filter users by the entered company name
  const handleFilterCompany = () => {
    const trimmed = companyFilter.trim();
    if (trimmed.length > 0) {
      const filtered = users.filter((user) =>
        user.company.toLowerCase().includes(trimmed.toLowerCase())
      );
      setFilteredUsers(filtered); // Set filtered users, not the companyFilter state
    } else {
      setFilteredUsers(users); // If no filter, show all users
    }
  };
  const handleFilterPosition = () => {
    const trimmed = positionFilter.trim();
    if (trimmed.length > 0) {
      const filtered = users.filter((user) =>
        user.position.toLowerCase().includes(trimmed.toLowerCase())
      );
      setFilteredUsers(filtered); // Set filtered users, not the companyFilter state
    } else {
      setFilteredUsers(users); // If no filter, show all users
    }
  };

  const handleInputChange = (e, userId, field) => {
    const newValue = e.target.value;
    setFilteredUsers(prev =>
      prev.map(user =>
        user.id === userId ? { ...user, [field]: newValue } : user
      )
    );
  };


  const handleSave = (userId) => {
    const userToUpdate = filteredUsers.find(u => u.id === userId);
  
    axios.put(`${url}/api/users/${userId}/`, userToUpdate)
      .then(() => {
        setEditingUserId(null);
        fetchUsers(); // Refresh with updated data
      })
      .catch((err) => {
        console.error("Failed to save user:", err);
        // Optional: add error handling UI
      });
  };
  

  return (
    
    <Stack  gap={"10"}>
        
        <Box mb={20} >
            <Input
            backgroundColor={"input_bgcolor"}
              color={"input_color"}
              width={"500px"}
              placeholder="Enter company name"
              css={{ "--focus-color": "red" }}
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)} // Update companyFilter state
            />
            <br></br>
            <br></br>
            <Button visual={"solid"} size={"lg"} onClick={handleFilterCompany}>Filter by company</Button>
            
            
          </Box>
          <Box mb={4}>
            <Input
            backgroundColor={"input_bgcolor"}
            color={"input_color"}
            width={"500px"}
              placeholder="Enter position name"
              css={{ "--focus-color": "red" }}
              value={positionFilter}
              onChange={(e) => setPositionFilter(e.target.value)} // Update companyFilter state
              
            />
            <br></br>
            <br></br>
            <Button visual={"solid"} size={"lg"} onClick={handleFilterPosition}>Filter by position</Button>
          </Box>
          {/* Table displaying filtered users */}
          {filteredUsers.length === 0 ? (
            <Text>No users found for the given company.</Text>
          ) : (
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
                {filteredUsers.map((user) => (
                  <Table.Row key={user.id}>
                  <Table.Cell>{editingUserId === user.id ? (
          <Input
            size="sm"
            value={user.name}
            onChange={(e) => handleInputChange(e, user.id, 'name')}
          />
        ) : (
          user.name
        )}</Table.Cell>
                  <Table.Cell>{editingUserId === user.id ? (
          <Input
            size="sm"
            value={user.email}
            onChange={(e) => handleInputChange(e, user.id, 'email')}
          />
        ) : (
          user.email
        )}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{editingUserId === user.id ? (
          <Input
            size="sm"
            value={user.company}
            onChange={(e) => handleInputChange(e, user.id, 'company')}
          />
        ) : (
          user.company
        )}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{editingUserId === user.id ? (
          <Input
            size="sm"
            value={user.age}
            onChange={(e) => handleInputChange(e, user.id, 'age')}
          />
        ) : (
          user.age
        )}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{editingUserId === user.id ? (
          <Input
            size="sm"
            value={user.position}
            onChange={(e) => handleInputChange(e, user.id, 'position')}
          />
        ) : (
          user.position
        )}</Table.Cell>
        <Table.Cell textAlign={"center"}>
  {editingUserId === user.id ? (
    <Button size="sm" onClick={() => handleSave(user.id) } cursor={"pointer"}>Save</Button>
  ) : (
    <Button size="sm" onClick={() => setEditingUserId(user.id) } cursor={"pointer"}>Edit</Button>
  )}
</Table.Cell>
              </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
    </Stack>
    )
}

export default UserListPage;
