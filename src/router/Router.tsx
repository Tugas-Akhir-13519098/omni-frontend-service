import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProduct from "../page/CreateProduct";
import Login from "../page/Login";
import Order from "../page/Order";
import Product from "../page/Product";
import Register from "../page/Register";
import UpdateProduct from "../page/UpdateProduct";
import Profile from "../page/Profile";
import Logout from "../page/Logout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product" element={<Product />} />
          <Route path="product/create" element={<CreateProduct />} />
          <Route path="product/update" element={<UpdateProduct />} />
          <Route path="order" element={<Order />} />
          <Route path="profile" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
