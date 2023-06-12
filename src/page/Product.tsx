import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Stack,
  Link,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import SimpleSidebar from "../component/Sidebar";
import { ProductData } from "../types/types";

export default function Product() {
  const baseURL = "http://localhost:8080/api/v1/product";
  const [products, setProducts] = useState<ProductData[]>();
  const toast = useToast();
  // const [productID, setProductID] = useState<string>();
  // const {
  //   isOpen: isDeleteModalOpen,
  //   onOpen: onDeleteModalOpen,
  //   onClose: onDeleteModalClose,
  // } = useDisclosure();

  const getProducts = () => {
    axios
      .get(baseURL)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to Get Data",
          description: "Error: " + err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const sendDeleteRequest = (id: string) => {
    axios
      .delete(baseURL + "/" + id)
      .then((res) => {
        console.log(res);
        getProducts();
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
          title: "Failed to Get Data",
          description: "Error: " + err,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure that you want to delete the product?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onDeleteModalClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="red">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> */}

      <SimpleSidebar>
        <Stack spacing={6}>
          <Flex margin={15}>
            <Heading size="lg">Product</Heading>
            <Spacer />
            <Link href="/product/create">
              <Button colorScheme="blue">Create</Button>
            </Link>
          </Flex>

          <TableContainer>
            <Table variant="simple" colorScheme="blackAlpha" size="sm">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Price</Th>
                  <Th>Weight</Th>
                  <Th>Stock</Th>
                  <Th>Image</Th>
                  <Th>Description</Th>
                  <Th>Tokopedia ID</Th>
                  <Th>Shopee ID</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products &&
                  products.map((product, i) => {
                    return (
                      <Tr>
                        <Td
                          css={{
                            width: "175px",
                            overflow: "scroll",
                          }}
                        >
                          {product.name}
                        </Td>
                        <Td>{product.price}</Td>
                        <Td>{product.weight}</Td>
                        <Td>{product.stock}</Td>
                        <Td
                          css={{
                            maxWidth: "175px",
                            overflow: "scroll",
                          }}
                        >
                          <Link href={product.image} isExternal>
                            {product.image}
                          </Link>
                        </Td>
                        <Td
                          css={{
                            maxWidth: "175px",
                            overflow: "scroll",
                          }}
                        >
                          {product.description}
                        </Td>
                        <Td>{product.tokopedia_product_id}</Td>
                        <Td>{product.shopee_product_id}</Td>
                        <Td>
                          <ButtonGroup gap="1">
                            <Link href={"/product/update?id=" + product.id}>
                              <Button colorScheme="teal" size="md">
                                Update
                              </Button>
                            </Link>
                            <Button
                              colorScheme="red"
                              size="md"
                              onClick={() => {
                                sendDeleteRequest(product.id);
                              }}
                            >
                              Delete
                            </Button>
                          </ButtonGroup>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </SimpleSidebar>
    </div>
  );
}
