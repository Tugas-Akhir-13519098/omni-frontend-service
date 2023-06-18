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
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { UserData } from "../types/types";
import { NotAuth } from "../component/Auth";
import { GetJWTCookie } from "../util/util";

export default function Profile() {
  const baseURL = "http://localhost:8080/api/v1/user";
  const config: AxiosRequestConfig = {
    withCredentials: true,

    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + GetJWTCookie(document.cookie),
      Accept: "application/json",
      "Access-Control-Allow-Headers": "set-cookie",
    },
  };
  const [user, setUser] = useState<UserData>();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      shop_name: user?.shop_name,
      tokopedia_fs_id: user?.tokopedia_fs_id,
      tokopedia_shop_id: user?.tokopedia_shop_id,
      tokopedia_bearer_token: user?.tokopedia_bearer_token,
      shopee_partner_id: user?.shopee_partner_id,
      shopee_shop_id: user?.shopee_shop_id,
      shopee_access_token: user?.shopee_access_token,
      shopee_sign: user?.shopee_sign,
    },
    onSubmit: (values) => {
      const reqBody = JSON.stringify(values, null, 2);

      axios
        .put(baseURL, reqBody, config)
        .then((res) => {
          console.log(res);
          toast({
            title: "User Updated",
            description: "Successfully updated the user.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: "Failed to Update User",
            description: "Error: " + err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    },
    enableReinitialize: true,
  });

  const getUser = () => {
    axios
      .get(baseURL, config)
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to Get Data",
          description: "Error: " + err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NotAuth />
      <SimpleSidebar>
        <Heading size="lg" marginBottom={"20px"}>
          Profile
        </Heading>
        <Flex>
          <Box width={"80%"} rounded="md">
            <form onSubmit={formik.handleSubmit}>
              <VStack spacing={4} align="flex-start">
                <FormControl>
                  <FormLabel htmlFor="name">Shop Name</FormLabel>
                  <Input
                    id="shop_name"
                    name="shop_name"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.shop_name}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="price">Tokopedia FS ID</FormLabel>
                  <Input
                    id="tokopedia_fs_id"
                    name="tokopedia_fs_id"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.tokopedia_fs_id}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">Tokopedia Shop ID</FormLabel>
                  <Input
                    id="tokopedia_shop_id"
                    name="tokopedia_shop_id"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.tokopedia_shop_id}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="stock">Tokopedia Bearer Token</FormLabel>
                  <Input
                    id="tokopedia_bearer_token"
                    name="tokopedia_bearer_token"
                    type="text"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.tokopedia_bearer_token}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="price">Shopee Partner ID</FormLabel>
                  <Input
                    id="shopee_partner_id"
                    name="shopee_partner_id"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.shopee_partner_id}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="weight">Shopee Shop ID</FormLabel>
                  <Input
                    id="shopee_shop_id"
                    name="shopee_shop_id"
                    type="number"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.shopee_shop_id}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="image">Shopee Access Token</FormLabel>
                  <Input
                    id="shopee_access_token"
                    name="shopee_access_token"
                    type="text"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.shopee_access_token}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="image">Shopee Sign</FormLabel>
                  <Input
                    id="shopee_sign"
                    name="shopee_sign"
                    type="text"
                    background={"white"}
                    variant="filled"
                    onChange={formik.handleChange}
                    value={formik.values.shopee_sign}
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
