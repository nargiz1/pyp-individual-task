import React from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Container,
  Input,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

const createUser = async (data) => {
  const { data: response } = await axios.post('http://localhost:3000/users', data);
  return response.data;
};

function Index() {
  const schema = yup
    .object()
    .shape({
      firstName: yup.string().required("firstName is required"),
      lastName: yup.string().required("lastName is required"),
      birthDate: yup.string().required("birthDate is required"),
      email: yup
        .string()
        .email("Field should contain a valid e-mail")
        .max(255)
        .required("E-mail is required"),
    })
    .required();

  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: data => {
      console.log(data);
      const message = "success"
      alert(message)
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });
  const onSubmit = (data) => {
    console.log('submitted', data)
  };

  const addUser = async (data) => {
    console.log(data);
    mutate(data)
  };

  return (
    <Container maxW="1500px" mt="4">
      <form onSubmit={handleSubmit(addUser)}>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            mb="3"
            {...register("firstName")}
            // value={input}
            // onChange={handleInputChange}
          />
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            mb="3"
            {...register("lastName")}
            // value={input}
            // onChange={handleInputChange}
          />
          <FormLabel>Birth Date</FormLabel>
          <Input
            type="date"
            mb="3"
            {...register("birthDate")}
            // value={input}
            // onChange={handleInputChange}
          />
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email")}
            // value={input}
            // onChange={handleInputChange}
          />
          {/* {!isError ? (
        <FormHelperText>
          Enter the email you'd like to receive the newsletter on.
        </FormHelperText>
      ) : (
        <FormErrorMessage>Email is required.</FormErrorMessage>
      )} */}
          <Button colorScheme="blue" mt="5" type="submit">
            Save User
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default Index;
