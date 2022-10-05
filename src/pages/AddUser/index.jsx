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

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(createUser, {
    onSuccess: data => {
      console.log(data);
      const message = "success"
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
          />
          {errors.firstName && <p style={{color: 'red'}}>{errors.firstName.message}</p>}
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            mb="3"
            {...register("lastName")}
          />
          {errors.lastName && <p style={{color: 'red'}}>{errors.lastName.message}</p>}
          <FormLabel>Birth Date</FormLabel>
          <Input
            type="date"
            mb="3"
            {...register("birthDate")}
          />
          {errors.birthDate && <p style={{color: 'red'}}>{errors.birthDate.message}</p>}
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email")}
          />
          {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
          <Button colorScheme="blue" mt="5" type="submit">
            Save User
          </Button>
        </FormControl>
      </form>
    </Container>
  );
}

export default Index;
