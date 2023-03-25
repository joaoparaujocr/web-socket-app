import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";

const ControlRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
);

export default ControlRoutes;
