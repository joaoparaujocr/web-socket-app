import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "../pages/Chat/indext";
import Login from "../pages/Login";

const ControlRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/chat" element={<Chat />} />
  </Routes>
);

export default ControlRoutes;
