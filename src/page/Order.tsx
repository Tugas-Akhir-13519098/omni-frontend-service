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
} from "@chakra-ui/react";
import SimpleSidebar from "../component/Sidebar";
import { OrderData } from "../types/types";

export default function Order() {
  const baseURL = "http://localhost:8080/api/v1/order";
  const [orders, setOrders] = useState<OrderData[]>();

  const getOrders = () => {
    axios
      .get(baseURL)
      .then((res) => {
        console.log(res.headers);
        setOrders(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <SimpleSidebar>
        <Stack spacing={6}>
          <Heading size="lg">Order</Heading>
          <TableContainer>
            <Table variant="simple" colorScheme="blackAlpha" size="sm">
              <Thead>
                <Tr>
                  <Th>Marketplace</Th>
                  <Th>Customer</Th>
                  <Th>Order Status</Th>
                  <Th>Products</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders &&
                  orders.map((order, i) => {
                    return (
                      <Tr>
                        <Td>
                          {order.tokopedia_order_id !== 0
                            ? "Tokopedia"
                            : "Shopee"}
                        </Td>
                        <Td>
                          <b> Name:</b> {order.customer.customer_name}
                          <br />
                          <b> Phone:</b> {order.customer.customer_phone}
                          <br />
                          <b> Address:</b> {order.customer.customer_address}
                          <br />
                          <b> District:</b> {order.customer.customer_district}
                          <br />
                          <b>City:</b> {order.customer.customer_city}
                          <br />
                          <b> Province:</b> {order.customer.customer_province}
                          <br />
                          <b>Country:</b> {order.customer.customer_country}
                          <br />
                          <b>Postal Code:</b>{" "}
                          {order.customer.customer_postal_code}
                        </Td>
                        <Td>{order.order_status}</Td>
                        <Td>
                          {order.products.map((orderProduct, i) => {
                            return (
                              <>
                                <b>Name:</b> {orderProduct.product_name} <br />
                                <b>Price:</b> Rp {orderProduct.product_price}{" "}
                                <br />
                                <b>Quantity:</b>
                                {orderProduct.product_quantity} <br /> <br />
                              </>
                            );
                          })}
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
