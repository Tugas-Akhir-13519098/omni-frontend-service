import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import SimpleSidebar from "../component/Sidebar";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { GetJWTCookie } from "../util/util";
import { NotAuth } from "../component/Auth";

export default function CreateProduct() {
  const baseURL = "http://localhost:8080/api/v1/product";
  const config: AxiosRequestConfig = {
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + GetJWTCookie(document.cookie),
      Accept: "application/json",
      "Access-Control-Allow-Headers": "set-cookie",
    },
  };
  const [isPriceError, setIsPriceError] = useState<boolean>(false);
  const [isWeightError, setIsWeightError] = useState<boolean>(false);
  const [isStockError, setIsStockError] = useState<boolean>(false);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      weight: "",
      stock: "",
      image: "",
      description: "",
    },
    onSubmit: (values) => {
      if (!(isPriceError || isStockError || isWeightError)) {
        const reqBody = JSON.stringify(values, null, 2);
        axios
          .post(baseURL, reqBody, config)
          .then((res) => {
            console.log(res);
            toast({
              title: "Product Created",
              description: "Successfully created the product.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          })
          .catch((err) => {
            console.log(err);
            toast({
              title: "Failed to Create Data",
              description: err.response.data.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      }
    },
  });

  const checkError = () => {
    if (Number(formik.values.weight) < 0) {
      setIsWeightError(true);
    } else {
      setIsWeightError(false);
    }
    if (Number(formik.values.stock) < 0) {
      setIsStockError(true);
    } else {
      setIsStockError(false);
    }
    if (Number(formik.values.price) < 0) {
      setIsPriceError(true);
    } else {
      setIsPriceError(false);
    }
  };

  return (
    <>
      <NotAuth />
      <SimpleSidebar>
        <Heading size="lg" marginBottom={"20px"}>
          Add Product
        </Heading>
        <Flex>
          <Box width={"80%"} rounded="md">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    name="name"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    required
                  />
                </FormControl>
                <FormControl isInvalid={isPriceError}>
                  <FormLabel htmlFor="price">Price (Rp)</FormLabel>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    onKeyUp={() => {
                      checkError();
                    }}
                    value={formik.values.price}
                    required
                  />
                  {!isPriceError ? (
                    <></>
                  ) : (
                    <FormErrorMessage>
                      Value must not be negative.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isWeightError}>
                  <FormLabel htmlFor="weight">Weight (Kg)</FormLabel>
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    onKeyUp={() => {
                      checkError();
                    }}
                    value={formik.values.weight}
                    required
                  />
                  {!isWeightError ? (
                    <></>
                  ) : (
                    <FormErrorMessage>
                      Value must not be negative.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isStockError}>
                  <FormLabel htmlFor="stock">Stock</FormLabel>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    onKeyUp={() => {
                      checkError();
                    }}
                    value={formik.values.stock}
                    required
                  />
                  {!isStockError ? (
                    <></>
                  ) : (
                    <FormErrorMessage>
                      Value must not be negative.
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="image">Image (Link)</FormLabel>
                  <Input
                    id="image"
                    name="image"
                    type="text"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    required
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                  Submit
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </SimpleSidebar>
    </>
  );
}
