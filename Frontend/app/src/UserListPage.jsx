import React, { useState, useEffect } from "react";
import axios from "axios";
import { Stack, Table, Input, Box, Text } from "@chakra-ui/react";
import { Button } from "./recipes/button";

export const url = "http://localhost:5555";

function UserListPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [companyFilter, setCompanyFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [editingField, setEditingField] = useState(null); // { userId, field }

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`${url}/api/users/`)
      .then((result) => {
        setUsers(result.data);
        setFilteredUsers(result.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch");
        setLoading(false);
        console.log(error);
      });
  };

  const handleFilterCompany = () => {
    const trimmed = companyFilter.trim();
    if (trimmed.length > 0) {
      const filtered = users.filter((user) =>
        user.company.toLowerCase().includes(trimmed.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleFilterPosition = () => {
    const trimmed = positionFilter.trim();
    if (trimmed.length > 0) {
      const filtered = users.filter((user) =>
        user.position.toLowerCase().includes(trimmed.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  const handleInputChange = (e, userId, field) => {
    const newValue = e.target.value;
    setFilteredUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, [field]: newValue } : user
      )
    );
  };

  const handleSave = (userId) => {
    const userToUpdate = filteredUsers.find((u) => u.id === userId);

    axios
      .put(`${url}/api/users/${userId}/`, userToUpdate)
      .then(() => {
        setEditingField(null);
        fetchUsers(); // Refresh
      })
      .catch((err) => {
        console.error("Failed to save user:", err);
      });
  };

  const renderCell = (user, field) => {
    const value = user[field];

    return (
      <Table.Cell
        textAlign="center"
        onClick={() => setEditingField({ userId: user.id, field })}
      >
        {editingField?.userId === user.id && editingField?.field === field ? (
          <Input
            size="sm"
            autoFocus
            value={value}
            onChange={(e) => handleInputChange(e, user.id, field)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(user.id);
              }
            }}
            onBlur={() => setEditingField(null)}
          />
        ) : (
          value
        )}
      </Table.Cell>
    );
  };

  return (
    <Stack gap={"10"}>
      <Box mb={20}>
        <Input
          backgroundColor={"input_bgcolor"}
          color={"input_color"}
          width={"500px"}
          placeholder="Enter company name"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        />
        <br />
        <br />
        <Button visual={"solid"} size={"lg"} onClick={handleFilterCompany}>
          Filter by company
        </Button>
      </Box>

      <Box mb={4}>
        <Input
          backgroundColor={"input_bgcolor"}
          color={"input_color"}
          width={"500px"}
          placeholder="Enter position name"
          value={positionFilter}
          onChange={(e) => setPositionFilter(e.target.value)}
        />
        <br />
        <br />
        <Button visual={"solid"} size={"lg"} onClick={handleFilterPosition}>
          Filter by position
        </Button>
      </Box>

      {filteredUsers.length === 0 ? (
        <Text>No users found for the given company.</Text>
      ) : (
        <Table.Root size={"lg"} striped showColumnBorder>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Name</Table.ColumnHeader>
              <Table.ColumnHeader>Email</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Company
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>Age</Table.ColumnHeader>
              <Table.ColumnHeader textAlign={"center"}>
                Position
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredUsers.map((user) => (
              <Table.Row key={user.id}>
                {renderCell(user, "name")}
                {renderCell(user, "email")}
                {renderCell(user, "company")}
                {renderCell(user, "age")}
                {renderCell(user, "position")}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Stack>
  );
}

export default UserListPage;
