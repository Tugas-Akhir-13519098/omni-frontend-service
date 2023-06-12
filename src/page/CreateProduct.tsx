import { useFormik } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import SimpleSidebar from "../component/Sidebar";
import axios from "axios";

export default function CreateProduct() {
  const baseURL = "http://localhost:8080/api/v1/product";
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
      const reqBody = JSON.stringify(values, null, 2);
      axios
        .post(baseURL, reqBody)
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
        .catch((err) => console.log(err));
    },
  });
  return (
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
              <FormControl>
                <FormLabel htmlFor="price">Price (Rp)</FormLabel>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  background={"white"}
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="weight">Weight (Kg)</FormLabel>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  background={"white"}
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.weight}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="stock">Stock</FormLabel>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  background={"white"}
                  variant="filled"
                  onChange={formik.handleChange}
                  value={formik.values.stock}
                  required
                />
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
  );
}
