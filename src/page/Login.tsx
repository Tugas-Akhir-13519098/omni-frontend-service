import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../component/Firebase";
import { useNavigate } from "react-router-dom";
import axios, { AxiosRequestConfig } from "axios";
import { IsAuth } from "../component/Auth";

export default function SignupCard() {
  const baseURL = "http://localhost:8080/api/v1/login";
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      const reqBody = JSON.stringify(values, null, 2);
      signInWithEmailAndPassword(
        auth,
        formik.values.email,
        formik.values.password
      )
        .then(async (userCredential) => {
          const user = userCredential.user;
          console.log(user);

          let config: AxiosRequestConfig = {
            withCredentials: true,

            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + (await user.getIdToken()),
              Accept: "application/json",
              "Access-Control-Allow-Headers": "set-cookie",
            },
          };
          axios
            .post(baseURL, reqBody, config)
            .then(async (res) => {
              console.log(res);
              toast({
                title: "Login Successfully",
                description: "Successfully login.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });

              navigate("/product");
            })
            .catch((err) => {
              console.log(err);
              toast({
                title: "Failed to Login",
                description: err.response.data.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          toast({
            title: "Failed to Register with code: " + errorCode,
            description: errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    },
  });

  return (
    <>
      <IsAuth />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign In To Your Account
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={4} width={"400px"}>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    type="submit"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    A new user?{" "}
                    <Link color={"blue.400"} href="register">
                      Register
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
