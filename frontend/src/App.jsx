import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/login";
import SignUp from "./Pages/signUp";
import Account from "./Pages/Account";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/account" element={<Account />}></Route>
    </Routes>
  );
};

export default App;
