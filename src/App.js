import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Mainpage from "./components/Mainpage";
import Products from "./components/Products";
// import Login from "./components/admin/Login";
import Register from "./components/admin/Register";
import Admindash from "./components/admin/AdminDash";
import ProductDash from "./components/admin/ProductDash";
import CategoryDash from "./components/admin/CatDash";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrders from "./components/Cart/ConfirmOrders.js";
import ProductDetails from "./components/ProductDetails.js";
import Footer from "./partials/Footer.js";
import Header from "./partials/Header.js";
import Profile from "./components/Profile.js";
import LoginSignup from "./components/user/LoginSignup";
import About from "./components/About.js";
import Terms from "./components/Terms.js";
import AuthRoute from "./AuthRoute.js"
import OrderDash from "./components/admin/OrderDash.js";


function App() {




  return (
    <BrowserRouter>
      <Routes id="main-container">
        
        <Route path="/" element={<Mainpage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/orders/confirm" element={<ConfirmOrders />} />
        <Route path="/user/login" element={<LoginSignup />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms-and-conditions" element={<Terms />} />


        <Route path="/dashboard" element={<Admindash />} />
        <Route path="/productdash" element={<ProductDash />} />
        <Route path="/categorydash" element={<CategoryDash />} />
        <Route path="/orderdash" element={<OrderDash />} />



      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
