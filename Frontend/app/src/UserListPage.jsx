import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Table, Input, Box , Text} from "@chakra-ui/react";
import { system } from "./themes/theme";
import { Button } from "./recipes/button";

export const url = "http://localhost:8000";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyFilter, setCompanyFilter] = useState(""); 
  const [positionFilter, setPositionFilter] = useState(""); 

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

  return (
    
    <Stack  gap={"20"}>
        {/* <Table.Root size={"lg"} striped showColumnBorder>
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

        </Table.Root> */}
        <Box mb={4}>
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
            <Button variant={"surface"} color={"black"} backgroundColor={"button_bgcolor"} size={"xl"} onClick={handleFilterCompany}>
              Filter by Company 
            </Button>
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
            <Button variant={"subtle"} color={"black"} backgroundColor={"button_bgcolor"}  size={"xl"} onClick={handleFilterPosition}>
              Filter by Position 
            </Button>
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
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{user.company}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{user.age}</Table.Cell>
                  <Table.Cell textAlign={"center"}>{user.position}</Table.Cell>
              </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          )}
    </Stack>
    )
}

export default UserListPage;
