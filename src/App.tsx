import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Product from "./page/Product";
import Order from "./page/Order";
import CreateProduct from "./page/CreateProduct";
import "./App.css";
import UpdateProduct from "./page/UpdateProduct";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Product />} />
            <Route path="product" element={<Product />} />
            <Route path="product/create" element={<CreateProduct />} />
            <Route path="product/update" element={<UpdateProduct />} />
            <Route path="order" element={<Order />} />
            <Route path="*" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
