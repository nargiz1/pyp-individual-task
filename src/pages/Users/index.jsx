import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Button,
} from "@chakra-ui/react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";


function Index() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("users", () =>
    axios.get("http://localhost:3000/users").then((res) => res.data)
  );

  const deleteUser = (user) => {
    axios
      .delete(`http://localhost:3000/users/${user._id}`)
      .then((res) => console.log(res));
    queryClient.invalidateQueries("users");
  };

  const updateUser = (user) => {};
  const addUserPage = () => {
    navigate("/users/add");
  };

  return (
    <Container maxW="1500px" mt="4">
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Oops, error...</h2>}
      {data && (
        <>
          <Button colorScheme="blue" mb="5" onClick={() => addUserPage()}>
            Add User
          </Button>
          <TableContainer>
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>First Name</Th>
                  <Th>Last Name</Th>
                  <Th>Email</Th>
                  <Th>Birth Date</Th>
                  <Th>Settings</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((user, index) => (
                  <Tr key={index}>
                    <Td>{user.firstName}</Td>
                    <Td>{user.lastName}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      {new Date(user.birthDate).toISOString().split("T")[0]}
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        me="2"
                        onClick={() => deleteUser(user)}
                      >
                        Delete
                      </Button>
                      <Button
                        colorScheme="yellow"
                        onClick={() => updateUser(user)}
                      >
                        Update
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
}

export default Index;
